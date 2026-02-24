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
    "https://api.ecumentis.org"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

app.use(authRoutes);
app.use(userRoutes);
app.use(quizRoutes);
app.use(dashboardRoutes);
app.use(alumnosRoutes);

module.exports = app;
