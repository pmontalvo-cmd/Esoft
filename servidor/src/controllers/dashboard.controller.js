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
  returnconst db = require("../config/database");

/* =========================
   UTILIDAD PROMESA DB
========================= */
function dbQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

/* =========================
   GET ALL BLOCKS
========================= */
async function getAllBlocks(req, res) {
  try {
    const rows = await dbQuery("SELECT * FROM learning_blocks", []);
    return res.status(200).json({
      ok: true,
      blocks: rows
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Database error",
      error: err.message
    });
  }
}

/* =========================
   GET BLOCK BY ID
========================= */
async function getBlockById(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "Invalid id"
      });
    }

    const rows = await dbQuery(
      "SELECT * FROM learning_blocks WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Block not found"
      });
    }

    const block = rows[0];

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

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Database error",
      error: err.message
    });
  }
}

/* =========================
   GET DASHBOARD
========================= */
async function getDashboard(req, res) {
  try {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        ok: false,
        message: "Invalid userId"
      });
    }

    const rows = await dbQuery(
      "SELECT id, grade FROM datos_usuario WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      ok: true,
      user: rows[0]
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Database error",
      error: err.message
    });
  }
}

/* =========================
   EXPORTS (MUY IMPORTANTE)
========================= */
module.exports = {
  getAllBlocks,
  getBlockById,
  getDashboard
};
