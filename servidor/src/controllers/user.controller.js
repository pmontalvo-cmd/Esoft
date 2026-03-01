const {db} = require("../config/database");

// Register New User
async function createUser(req, res) {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      age,
      grade,
      takes_math,
      takes_lenguage,
      username,
      password
    } = req.body;

    const userData = [
      first_name,
      middle_name,
      last_name,
      age || 1,
      grade || 1,
      takes_math || 1,
      takes_lenguage || 1,
      username,
      password
    ];

    await db.query(
      "INSERT INTO datos_usuario (first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      userData
    );

    res.send("Registrado!");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB error");
  }
}

// Get All Users
async function getAllUsers(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM datos_usuario");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB error");
  }
}

// Get User By Id
async function getUser(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM datos_usuario WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]); // solo un usuario
  } catch (error) {
    console.error(error);
    res.status(500).send("DB error");
  }
}

// Update User Info
async function updateUser(req, res) {
  try {
    const { id } = req.body;
    const userId = Number(id);
    if (!userId) return res.status(400).send("Missing/invalid id");

    const allowed = [
      "first_name",
      "middle_name",
      "last_name",
      "age",
      "grade",
      "takes_math",
      "takes_lenguage",
      "username",
      "password",
    ];

    const sets = [];
    const params = [];

    for (const key of allowed) {
      if (!Object.prototype.hasOwnProperty.call(req.body, key)) continue;

      const raw = req.body[key];
      if (raw === undefined) continue; // clave para evitar 500

      // opcional: normalizar strings vacíos
      const val = raw === "" ? null : raw;

      // seguridad: si password viene vacío, no lo actualices
      if (key === "password" && (val === null || val === "")) continue;

      sets.push(`${key}=?`);
      params.push(val);
    }

    if (sets.length === 0) return res.status(400).send("No fields to update");

    params.push(userId);

    await db.query(
      `UPDATE datos_usuario SET ${sets.join(", ")} WHERE id=?`,
      params
    );

    res.send("Actualizado!");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB error");
  }
}

// Delete User
async function deleteUser(req, res) {
  try {
    await db.query("DELETE FROM datos_usuario WHERE id=?", [req.params.id]);
    res.send("Eliminado!");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB error");
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
