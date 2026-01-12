const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const path = require("path");
const quizData = require(path.join(__dirname, "../cliente/src/components/QuizComponents/quizData.js"));
const { questions } = quizData;

const db = mysql.createConnection({ host: "", user: "remote", password: "Cema5586", database: "pp" });

db.connect((err) => {
    if (err) {
        console.error("DB connection error:", err);
        return;
    }
    console.log("Database connected");
});

// -----------------------------------
// ✅ User Authentication & Management
// -----------------------------------

// 🟢 Register New User
app.post("/create", (req, res) => {
    const { first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password } = req.body;
    
    const userData = {
        first_name, middle_name, last_name,
        age: age || 1,
        grade: grade || 1,
        takes_math: takes_math || 1,
        takes_lenguage: takes_lenguage || 1,
        username, password
    };

    db.query(
        "INSERT INTO datos_usuario (first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        Object.values(userData),
        (err) => {
            if (err) return res.status(500).send("DB error");
            res.send("Registrado!");
        }
    );
});

// 🟢 Get All Users
app.get("/alumnos", (req, res) => {
    db.query("SELECT * FROM datos_usuario", (err, result) => {
        if (err) return res.status(500).send("DB error");
        res.send(result);
    });
});

// 🟢 Update User Info
app.put("/update", (req, res) => {
    const { id, first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password } = req.body;

    db.query(
        "UPDATE datos_usuario SET first_name=?, middle_name=?, last_name=?, age=?, grade=?, takes_math=?, takes_lenguage=?, username=?, password=? WHERE id=?",
        [first_name, middle_name, last_name, age, grade, takes_math, takes_lenguage, username, password, id],
        (err) => {
            if (err) return res.status(500).send("DB error");
            res.send("Actualizado!");
        }
    );
});

// 🟢 Delete User
app.delete("/delete/:id", (req, res) => {
    db.query("DELETE FROM datos_usuario WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.status(500).send("DB error");
        res.send(result);
    });
});

// 🟢 Login User
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT id, username, grade FROM datos_usuario WHERE username=? AND password=?",
        [username, password],
        (err, rows) => {
            if (err) return res.status(500).send("DB error");
            if (rows.length === 0) return res.status(401).send("Invalid credentials");

            res.json(rows[0]); // Send user data without password
        }
    );
});

// -----------------------------------
// ✅ Quiz Logic
// -----------------------------------

const sessionAnsweredQuestions = new Map();

// ✅ Helper function to map grade -> difficulty if none is set
function mapGradeToDifficulty(grade) {
    if (grade <= 3) return 1; // beginner
    if (grade <= 5) return 2; // intermediate
    if (grade <= 8) return 3; // moderate
    return 4;                 // advanced
}

app.get("/api/nextQuestion/:userId", (req, res) => {
    const userId = req.params.userId;
    console.log(`🔍 Fetching next question for userId: ${userId}`);

    // ✅ Step 1: Fetch User Data
    db.query("SELECT * FROM datos_usuario WHERE id = ?", [userId], (err, rows) => {
        if (err) {
            console.error("❌ Database error while fetching user:", err);
            return res.status(500).json({ error: "DB error" });
        }

        if (rows.length === 0) {
            console.log(`⚠️ User with ID ${userId} NOT FOUND in database!`);
            return res.status(404).json({ error: "User not found" });
        }

        let user = rows[0];
        let { current_difficulty, grade } = user;

        if (!current_difficulty || current_difficulty < 1 || current_difficulty > 4) {
            current_difficulty = mapGradeToDifficulty(grade);
        }

        console.log(`📊 User Difficulty: ${current_difficulty}`);

        // ✅ Step 2: Track answered questions in session
        if (!sessionAnsweredQuestions.has(userId)) {
            sessionAnsweredQuestions.set(userId, new Set());
        }
        const userAnswered = sessionAnsweredQuestions.get(userId);

        // ✅ Step 3: Get available questions at the user's difficulty
        let availableLanguage = questions.filter(q => q.category === "language" && q.difficulty === current_difficulty && !userAnswered.has(q.id));
let availableMath = questions.filter(q => q.category === "math" && q.difficulty === current_difficulty && !userAnswered.has(q.id));

console.log(`📜 Available Language: ${availableLanguage.length}, Available Math: ${availableMath.length}`);

// ✅ Logic to force a switch if too many language questions have been asked in a row
if (sessionAnsweredQuestions.get(userId).size % 3 === 0 && availableMath.length > 0) {
    console.log("🔄 Switching to a math question to balance categories.");
    availableQuestions = availableMath;
} else {
    availableQuestions = availableLanguage.length > 0 ? availableLanguage : availableMath;
}

        console.log(`🆕 Available Questions: ${availableQuestions.length}`);

        // ✅ Step 4: Reset tracking if all questions are used
      if (availableQuestions.length === 0) {
    console.log(`♻️ All questions used! Resetting tracking and reshuffling for userId ${userId}`);

    sessionAnsweredQuestions.set(userId, new Set());

    // ✅ FIX: Shuffle questions after reset to avoid repeats
    availableQuestions = questions
    .filter(q => q.difficulty === current_difficulty)
    .sort(() => Math.random() - 0.5); // ✅ Randomize order
}


        // ✅ Step 5: Prevent errors if no questions remain
        if (availableQuestions.length === 0) {
            return res.status(500).json({ error: "No new questions available. Try again later." });
        }

        const question = availableQuestions[0];

        console.log(`🎯 Selected Question:`, question);

        // ✅ Step 7: Mark question as answered for this session
        userAnswered.add(question.id);

        res.json(question);
    });
});

// -----------------------------------
// ✅ Submit Answer & Adjust Difficulty (No Promises, Using Callbacks)
// -----------------------------------
app.post("/api/submitAnswer", (req, res) => {
    const { userId, questionId, userAnswer } = req.body;

    const question = questions.find(q => q.id === questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const isCorrect = (question.answer === userAnswer);

    db.query("SELECT * FROM datos_usuario WHERE id = ?", [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: "DB error" });
        if (rows.length === 0) return res.status(404).json({ error: "User not found" });

        let user = rows[0];
        let currentDiff = user.current_difficulty;

        if (isCorrect) {
            if (currentDiff < 4) currentDiff++; 
        } else {
            if (currentDiff > 1) currentDiff--; 
        }

        console.log(`🔄 Adjusted Difficulty for userId ${userId}: ${currentDiff}`);

        // ✅ Update User Difficulty
        db.query(
            "UPDATE datos_usuario SET current_difficulty=? WHERE id=?",
            [currentDiff, userId],
            (err2) => {
                if (err2) return res.status(500).json({ error: "Error updating user difficulty" });

                res.json({ correct: isCorrect, newDifficulty: currentDiff });
            }
        );
    });
});

// ✅ Start Server
app.listen(3002, () => { console.log("Corriendo en le puerto 3002") });