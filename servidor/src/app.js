const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const quizRoutes = require("./routes/quiz.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express(); // 👈 PRIMERO se crea la app
const alumnosRoutes = require("./routes/alumnos.routes");
// Middlewares
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.options("*", cors()); 
// Rutas
app.use(authRoutes);
app.use(userRoutes);
app.use(quizRoutes);
app.use(dashboardRoutes);
app.use(alumnosRoutes);
module.exports = app;