const db = require("../config/database")
const {questions} = require("../data/quizData")
const quizService =require("../services/quiz.service")

function nextQuestion(req, res) {
    const userId = req.params.userId;
    console.log(`Fetching next question for userId: ${userId}`);

    db.query("SELECT * FROM datos_usuario WHERE id = ?",[userId],(err, rows) => {
            if (err) {
                console.error("Error: Database error while fetching user:", err);
                return res.status(500).json({ error: "DB error" });
            }
            if (rows.length === 0) {
                console.log(`Warning: User with ID ${userId} NOT FOUND in database!`);
                return res.status(404).json({ error: "User not found" });
            }

            const user = rows[0];

            const result = quizService.selectNextQuestion({
                userId, user, questions,
            });

            if(result.error){
                return res.status(500).json({error:result.error});
            }

            res.json(result.question);
        });
}

// Submit Answer
function submitAnswer(req, res) {
    const { userId, questionId, userAnswer } = req.body;

    const question = questions.find((q) => q.id === questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const isCorrect = question.answer === userAnswer;

    db.query(
        "SELECT * FROM datos_usuario WHERE id = ?",[userId],(err, rows) => {
            if (err) return res.status(500).json({ error: "DB error" });
            if (rows.length === 0)
                return res.status(404).json({ error: "User not found" });

            const user = rows[0];
            const currentDiff = user.current_difficulty || 1;

            const newDiff = quizService.gradeAnswerAndAdjustDifficulty({
                currentDiff, isCorrect,
            });

            // Update User Difficulty
            db.query(
                "UPDATE datos_usuario SET current_difficulty=? WHERE id=?",
                [newDiff, userId],
                (err2) => {
                    if (err2)return res.status(500).json({ error: "Error updating user difficulty" });

                    res.json({ correct: isCorrect, newDifficulty: newDiff });
                },
            );
        },
    );
};

function submitQuiz(req,res){
    try {
        const {userId, math_score, language_score} = req.body;
        if(userId == null || math_score == null || language_score == null){
            return res.status(400).json({
                ok: false,
                message: "Mising fields: userId, MathScore, LanguageScore"
        });
    }
    //Check if userId exist in the Database
    db.query("SELECT * FROM datos_usuario WHERE id = ?", [userId], (err,rows) => {
        if (err) return res.status(500).json({ error: "DB error" });
        if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    

    // Save math_score and language_score in DB
    db.query("UPDATE datos_usuario SET math_score=?, language_score=? WHERE id=?", [math_score, language_score, userId], (err,response) => {
        if (err) return res.status(500).json({ error: "DB error" });
        if (response.affectedRows === 0) return res.status(404).json({ error: "User not found" });
    //Response to Client
    return res.status(200).json({
        ok: true,
        message: "Quiz Submited"
    });
    });});
    
    
    }catch (err) {
    console.error(err);
    return res.status(500).json({
    ok: false,
    message: "Internal server error",
    });
}};



module.exports = { nextQuestion, submitAnswer, submitQuiz };
