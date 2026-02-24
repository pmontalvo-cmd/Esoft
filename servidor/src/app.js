const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const quizRoutes = require("./routes/quiz.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const alumnosRoutes = require("./routes/alumnos.routes");

const app = express();

/* ===========================
   CORS CONFIGURACIÓN CORRECTA
=========================== */

const allowedOrigins = [
  "http://localhost:3000",
  "https://ecumentis.org",
  "https://www.ecumentis.org"
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requests sin origin (ej: Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

/* ===========================
   MIDDLEWARES
=========================== */

app.use(express.json());

/* ===========================
   HEALTH CHECK
=========================== */

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

/* ===========================
   RUTAS
=========================== */

app.use(authRoutes);
app.use(userRoutes);
app.use(quizRoutes);
app.use(dashboardRoutes);
app.use(alumnosRoutes);

/* ===========================
   EXPORT
=========================== */

module.exports = app;
