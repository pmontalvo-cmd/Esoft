const {db} = require("../config/database");

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query(
      "SELECT id, username, grade FROM datos_usuario WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
}

module.exports = { login };
