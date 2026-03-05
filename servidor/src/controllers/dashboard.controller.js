
const { pool } = require("../config/database")

function getAllBlocks(req, res){

    const lang = (req.query.lang || "es").toLowerCase();

    const titleSel = lang === "es" ? "COALESCE(title_es, title) AS title" : "title";
    const summarySel = lang === "es" ? "COALESCE(summary_es, summary) AS summary" : "summary";
pool.query(`SELECT id, subject, level, grade_min, grade_max, estimated_minutes, tags_json, 
    ${titleSel}, ${summarySel} FROM learning_blocks ORDER BY id ASC`, (err, rows) => {
    if (err) return res.status(500).json({ ok: false, error: "DB error" });

    return res.status(200).json({ ok: true, blocks: rows });
});
}

function getBlockById(req, res) {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ ok: false, error: "Invalid id" });

    const lang = (req.query.lang || "es").toLowerCase();

    pool.query(
        `SELECT id, subject, level, estimated_minutes,
                title, summary, content_json,
                title_es, summary_es, content_json_es
        FROM learning_blocks
        WHERE id=?`,
        [id],
        (err, rows) => {
        if (err) return res.status(500).json({ ok: false, error: "DB error" });
        if (rows.length === 0) return res.status(404).json({ ok: false, error: "Block Not Found" });

        const b = rows[0];

        const title = (lang === "es" && b.title_es) ? b.title_es : b.title;
        const summary = (lang === "es" && b.summary_es) ? b.summary_es : b.summary;
        const content = (lang === "es" && b.content_json_es) ? b.content_json_es : b.content_json;

        return res.status(200).json({
            ok: true,
            block: {
            id: b.id,
            subject: b.subject,
            level: b.level,
            title,
            summary,
            estimated_minutes: b.estimated_minutes,
            content
        }
    });
    }
);
}


const SUBJECTS = ["math","language","science","social","tech","finance","logic"];

function scoreTOlevel(score){
    if(score == null) return 1;
    if(score <= 25) return 1;
    if(score <= 50) return 2;
    if(score <=75) return 3;
    if(score <=100) return 4;
    return 4;
    /*
if (score == null) return 4;
if (score <= 12) return 1;
if (score <= 25) return 2;
if (score <= 37) return 3;
if (score <= 50) return 4;
if (score <= 62) return 5;
if (score <= 75) return 6;
if (score <= 87) return 7;
return 8; */
}
function dbQuery(sql, params) {
return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
});
}

async function fetchBlocksForSubject({ subject, grade, targetLevel, limit, lang }) {
// Intentos: primero target y target-1; si no hay, expandimos.
const levelPlans = [
    [targetLevel, Math.max(1, targetLevel - 1)],
    [targetLevel, Math.max(1, targetLevel - 1), Math.min(4, targetLevel + 1)],
    [Math.max(1, targetLevel - 2), Math.max(1, targetLevel - 1), targetLevel, Math.min(4, targetLevel + 1), Math.min(4, targetLevel + 2)],
];
    const titleSel = lang === "es" ? "COALESCE(title_es, title) AS title" : "title";
    const summarySel = lang === "es" ? "COALESCE(summary_es, summary) AS summary" : "summary";
for (const levels of levelPlans) {
    const placeholders = levels.map(() => "?").join(",");



    const rows = await dbQuery(
    `SELECT id, subject, level, ${titleSel}, ${summarySel}, estimated_minutes, tags_json
    FROM learning_blocks
    WHERE subject = ?
        AND ? BETWEEN grade_min AND grade_max
        AND level IN (${placeholders})
    ORDER BY ABS(level - ?) ASC, id ASC
    LIMIT ?`,
    [subject, grade, ...levels, targetLevel, limit]
    );

    if (rows.length > 0) return rows;
}
return [];
}

function parseTags(tags_json) {
if (typeof tags_json !== "string") return tags_json;
try { return JSON.parse(tags_json); } catch { return tags_json; }
}

async function getDashboard(req, res) {
try {
    const userId = Number(req.params.userId);
    const lang = (req.query.lang || "es").toLowerCase();
    if (!userId) return res.status(400).json({ ok: false, message: "Missing/invalid userId" });

    const rows = await dbQuery(
    `SELECT id, grade,
            math_score, science_score, language_score, social_score, tech_score, finance_score, logic_score
    FROM datos_usuario
    WHERE id = ?`,
    [userId]
    );

    if (rows.length === 0) return res.status(404).json({ ok: false, message: "User not found" });

    const u = rows[0];
    const scores = {
    math: u.math_score,
    science: u.science_score,
    language: u.language_score,
    social: u.social_score,
    tech: u.tech_score,
    finance: u.finance_score,
    logic: u.logic_score,
    };

    // Clasificar subjects por tier
    const subjectsInfo = SUBJECTS
    .map((subject) => {
        const s = scores[subject];
        return {
        subject,
        score: s,
        targetLevel: scoreTOlevel(s),
        tier: s == null ? "mid" : (s < 40 ? "low" : (s <= 70 ? "mid" : "high"))
        };
    })
    .filter((x) => Number(x.score ?? 0) > 0);

const sourcePool = subjectsInfo.length > 0
? subjectsInfo
: SUBJECTS.map((subject) => ({
    subject,
    score: 50,
    targetLevel: 2,
    tier: "mid",
    }));

const low = sourcePool
.filter((x) => x.tier === "low")
.sort((a, b) => (a.score ?? 999) - (b.score ?? 999));

const mid = sourcePool
.filter((x) => x.tier === "mid")
.sort((a, b) => (a.score ?? 999) - (b.score ?? 999));

const high = sourcePool
.filter((x) => x.tier === "high")
.sort((a, b) => (a.score ?? 999) - (b.score ?? 999));

    // Plan balanced: 4 low, 3 mid, 1 high (total 8)
    const TOTAL = 8;
    const plan = [
    ...low.slice(0, 4),
    ...mid.slice(0, 3),
    ...high.slice(0, 1),
    ];

    // Relleno si no alcanza
    const fillPool = [...low, ...mid, ...high];
    const chosenSubjects = new Set(plan.map(p => p.subject));
    for (const item of fillPool) {
    if (plan.length >= TOTAL) break;
    if (chosenSubjects.has(item.subject)) continue;
    plan.push(item);
    chosenSubjects.add(item.subject);
    }

    // Buscar bloques por subject, max 2 por materia
    let recommendedBlocks = [];
    const perSubjectCount = new Map();
    const seen = new Set();

    for (const item of plan) {
    if (recommendedBlocks.length >= TOTAL) break;

    const count = perSubjectCount.get(item.subject) ?? 0;
    if (count >= 2) continue;

    const gradeForBlocks = Math.min(Number(u.grade) || 0, 12); // Limita Grade a maximo 12

    const rowsBlocks = await fetchBlocksForSubject({
        subject: item.subject,
        grade: gradeForBlocks ,
        targetLevel: item.targetLevel,
        limit: 2 - count,
        lang

    });

    for (const b of rowsBlocks) {
        if (recommendedBlocks.length >= TOTAL) break;
        if (seen.has(b.id)) continue;

        seen.add(b.id);

        recommendedBlocks.push({
        id: b.id,
        subject: b.subject,
        level: b.level,
        title: b.title,
        summary: b.summary,
        estimated_minutes: b.estimated_minutes,
        tags: parseTags(b.tags_json) ?? []
        });

        perSubjectCount.set(item.subject, (perSubjectCount.get(item.subject) ?? 0) + 1);
    }
    }

    // Respuesta a Cliente
    return res.status(200).json({
    ok: true,
    user: { id: u.id, grade: u.grade },
    scores,
    recommendedBlocks
    });

} catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Internal server error:" + err.message });
}
}

async function searchBlocks(req, res) {
try {
    const lang = (req.query.lang || "es").toLowerCase();
    const userId = Number(req.params.userId);
    if (!userId) return res.status(400).json({ ok: false, message: "Missing/invalid userId" });

    const qRaw = (req.query.q ?? "").toString().trim();
    const subject = (req.query.subject ?? "").toString().trim(); 
    const level = req.query.level != null && req.query.level !== "" ? Number(req.query.level) : null
    const limit = req.query.limit != null ? Math.min(50, Math.max(1, Number(req.query.limit))) : 12;

    // Si no hay query no busca nada evita retornar todo el catálogo
    if (!qRaw) return res.status(200).json({ ok: true, blocks: [] });

    // Trae grade del usuario para filtrar por grade_min/grade_max
    const uRows = await dbQuery(`SELECT id, grade FROM datos_usuario WHERE id = ?`, [userId]);
    if (uRows.length === 0) return res.status(404).json({ ok: false, message: "User not found" });

    const gradeForBlocks = Math.min(Number(uRows[0].grade) || 0, 12); // Limita grade a 12

    const like = `%${qRaw}%`;

    // SQL dinámico simple
    const titleSel = lang === "es" ? "COALESCE(title_es, title)" : "title";
    const summarySel = lang === "es" ? "COALESCE(summary_es, summary)" : "summary";

    let sql = `
    SELECT id, subject, level,
            ${titleSel} AS title,
            ${summarySel} AS summary,
            estimated_minutes, tags_json
    FROM learning_blocks
    WHERE ? BETWEEN grade_min AND grade_max
        AND (
        ${titleSel} LIKE ? OR
        ${summarySel} LIKE ? OR
        tags_json LIKE ?
        )
    `;
    const params = [gradeForBlocks, like, like, like];

    if (subject) {
    sql += ` AND subject = ?`;
    params.push(subject);
    }
    if (Number.isFinite(level)) {
    sql += ` AND level = ?`;
    params.push(level);
    }

    sql += ` ORDER BY id ASC LIMIT ?`;
    params.push(limit);

    const rows = await dbQuery(sql, params);

    const dedupeById = (arr) =>
    Array.from(new Map(arr.map((b) => [b.id, b])).values());

    const blocks = dedupeById(rows.map((b) => ({
    id: b.id,
    subject: b.subject,
    level: b.level,
    title: b.title,
    summary: b.summary,
    estimated_minutes: b.estimated_minutes,
    tags: parseTags(b.tags_json) ?? []
    })));

    return res.status(200).json({ ok: true, blocks });
} catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Internal server error: " + err.message });
}
}


module.exports = {getAllBlocks, getBlockById, getDashboard, searchBlocks}
