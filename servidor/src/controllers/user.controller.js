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
    const userId = Number(req.body.id);
    if (!userId) {
      return res.status(400).json({ ok: false, message: "Missing/invalid id" });
    }

    // Solo permitir actualizar estos campos
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
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        // Si el frontend manda "", lo convertimos a NULL (opcional)
        const val = req.body[key] === "" ? null : req.body[key];
        sets.push(`${key} = ?`);
        params.push(val);
      }
    }

    // Si no mandaron nada para actualizar
    if (sets.length === 0) {
      return res.status(400).json({ ok: false, message: "No fields to update" });
    }

    params.push(userId);

    await dbQuery(
      `UPDATE datos_usuario SET ${sets.join(", ")} WHERE id = ?`,
      params
    );

    return res.json({ ok: true });
  } catch (error) {
    console.error("updateUser error:", error);
    return res.status(500).json({ ok: false, message: error.message });
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
