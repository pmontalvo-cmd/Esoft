const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const quizRoutes = require("./routes/quiz.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const alumnosRoutes = require("./routes/alumnos.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://ecumentis.org",
  "https://www.ecumentis.org"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.get("/health", (req, res) => res.status(200).json({ ok: true }));

app.use(authRoutes);
app.use(userRoutes);
app.use(quizRoutes);
app.use(dashboardRoutes);
app.use(alumnosRoutes);

module.exports = app;
