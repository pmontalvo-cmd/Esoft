const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const quizRoutes = require("./routes/quiz.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();
const alumnosRoutes = require("./routes/alumnos.routes");

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://ecumentis.org",
    "https://www.ecumentis.org"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());
const db = require("../config/database");

app.get("/health", (req, res) => res.status(200).json({ ok: true })); //Backend Healt test

// Backend DB connection test
app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS ok");
    return res.json({ ok: true, rows });
  } catch (err) {
    console.error("DB TEST ERROR:", err);
    return res.status(500).json({
      ok: false,
      name: err.name,
      code: err.code,
      errno: err.errno,
      message: err.message,
    });
  }
});

app.use(authRoutes);
app.use(userRoutes);
app.use(quizRoutes);
app.use(dashboardRoutes);
app.use(alumnosRoutes);

module.exports = app;
