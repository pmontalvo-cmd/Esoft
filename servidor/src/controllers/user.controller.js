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
    const {
      id,
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

    await db.query(
      "UPDATE datos_usuario SET first_name=?, middle_name=?, last_name=?, age=?, grade=?, takes_math=?, takes_lenguage=?, username=?, password=? WHERE id=?",
      [first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password, id]
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
