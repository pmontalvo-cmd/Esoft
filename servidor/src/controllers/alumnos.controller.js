const db = require("../config/database");

// 🔹 GET
exports.getAlumnos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM alumnos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener alumnos" });
  }
};

// 🔹 CREATE
exports.createAlumno = async (req, res) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      username,
      password,
      age,
      grade,
      takes_math,
      takes_lenguage
    } = req.body;

    await db.query(
      "INSERT INTO  datos_usuario (first_name, middle_name, last_name, username, password, age, grade, takes_math, takes_lenguage) VALUES (?,?,?,?,?,?,?,?,?)",
      [first_name, middle_name, last_name, username, password, age, grade, takes_math, takes_lenguage]
    );

    res.json({ message: "Alumno creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear alumno" });
  }
};

// 🔹 DELETE
exports.deleteAlumno = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM alumnos WHERE id = ?", [id]);

    res.json({ message: "Alumno eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar alumno" });
  }
};
