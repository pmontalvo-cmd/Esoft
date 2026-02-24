const db = require("../config/database");

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
