const cors = require("cors");
const express = require("express");

const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/users.routes")
const quizRoutes = require("./routes/quiz.routes")
const dashboardRoutes = require("./routes/dashboard.routes")

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes)
app.use(userRoutes)
app.use(quizRoutes)
app.use(dashboardRoutes)
module.exports = app;