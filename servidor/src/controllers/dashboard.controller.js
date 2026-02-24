const db = require("../config/database")

function CheckInput(req, res){
try {
        const {userId} = req.body;
        if(userId == null){
            return res.status(400).json({
                ok: false,
                message: "Mising userId"
        });
    }
    // Check if User Id exists in database
    db.query("SELECT * FROM datos_usuario WHERE id = ?", [userId], (err,rows) => {
        if (err) return res.status(500).json({ error: "DB error" });
        if (rows.length === 0) return res.status(404).json({ error: "User not found" })
        
        // Check If Scores Exist in User
    db.query("SELECT math_score, language_score FROM datos_usuario WHERE id = ?", [userId], (err,rows) => {
        if (err) return res.status(500).json({ error: "DB error"});
        if (rows.length === 0) return res.status(404).json({ error: "User Scores not found"})

        const {math_score, language_score} = rows[0];
        return res.status(200).json({userId, math_score, language_score})

        
    })});

}catch (err) {
    console.error(err);
    return res.status(500).json({
    ok: false,
    message: "Internal server error",
    });
}};


function getAllBlocks(req, res){
 db.query("SELECT * FROM learning_blocks", (err, rows) => {
    if (err) return res.status(500).json({ ok: false, error: "DB error" });

    return res.status(200).json({ ok: true, blocks: rows });
});
}

function getBlockById(req, res){
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ ok: false, error: "Invalid id" });

    db.query("SELECT * FROM learning_blocks WHERE id=?", [id], (err, rows) =>{
        if(err) return res.status(500).json({ ok: false, error: "DB error"});
        if(rows.length === 0) return res.status(404).json({of: false, error: "Block Not Found"});

        const block = { ...rows[0] };

        return res.status(200).json({
        ok: true,
        block: {
            id: block.id,
            subject: block.subject,
            level: block.level,
            title: block.title,
            summary: block.summary,
            estimated_minutes: block.estimated_minutes,
            content: block.content_json
            }
        });
    });
}


const SUBJECTS = ["math","language","science","social","tech","finance","logic"];

function scoreTOlevel(score){
    if(score == null) return 1;
    if(score <= 25) return 1;
    if(score <= 50) return 2;
    if(score <=75) return 3;
    if(score <=100) return 4;
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
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}

async function fetchBlocksForSubject({ subject, grade, targetLevel, limit }) {
  const minL = Math.max(1, targetLevel - 2);
  const maxL = Math.min(4, targetLevel + 2);

  const rows = await dbQuery(
    `SELECT id, subject, level, title, summary, estimated_minutes, tags_json
     FROM learning_blocks
     WHERE subject = ?
       AND grade_min <= ? AND grade_max >= ?
       AND level BETWEEN ? AND ?
     ORDER BY ABS(level - ?) ASC, id ASC
     LIMIT ?`,
    [subject, grade, grade, minL, maxL, targetLevel, limit]
  );

  return rows;
}

function parseTags(tags_json) {
if (typeof tags_json !== "string") return tags_json;
try { return JSON.parse(tags_json); } catch { return tags_json; }
}

async function getDashboard(req, res) {
  try {
    const userId = Number(req.params.userId);
    const rows = await dbQuery(
      "SELECT id, grade FROM datos_usuario WHERE id=?",
      [userId]
    );
    return res.json({ ok: true, step: "user", rows });
  } catch (err) {
    return res.status(500).json({ ok: false, where: "user", message: err.message, code: err.code });
  }
}
/*
async function getDashboard(req, res) {
try {
    const userId = Number(req.params.userId);
    if (!userId) return res.status(400).json({ ok: false, message: "Missing/invalid userId" });

    // Ajusta nombres de columnas si aún no las creas todas (pero esta es la meta final)
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
    const subjectsInfo = SUBJECTS.map((subject) => {
    const s = scores[subject];
    return {
        subject,
        score: s,
        targetLevel: scoreTOlevel(s),
        tier: s == null ? "mid" : (s < 40 ? "low" : (s <= 70 ? "mid" : "high"))
    };
    });

    const low = subjectsInfo.filter(x => x.tier === "low").sort((a,b)=> (a.score??999)-(b.score??999));
    const mid = subjectsInfo.filter(x => x.tier === "mid").sort((a,b)=> (a.score??999)-(b.score??999));
    const high = subjectsInfo.filter(x => x.tier === "high").sort((a,b)=> (a.score??999)-(b.score??999));

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
    const recommendedBlocks = [];
    const perSubjectCount = new Map();

    for (const item of plan) {
    if (recommendedBlocks.length >= TOTAL) break;

    const count = perSubjectCount.get(item.subject) ?? 0;
    if (count >= 2) continue;

    const rowsBlocks = await fetchBlocksForSubject({
        subject: item.subject,
        grade: u.grade,
        targetLevel: item.targetLevel,
        limit: 2 - count
    });

    for (const b of rowsBlocks) {
        if (recommendedBlocks.length >= TOTAL) break;

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

    // Contrato fijo para tu compañero ✅
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


module.exports = {getAllBlocks, getBlockById, getDashboard}
*/
