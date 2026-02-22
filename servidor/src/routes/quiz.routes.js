const router = require("express").Router();
const quizController = require("../controllers/quiz.controller");

router.get("/api/nextQuestion/:userId", quizController.nextQuestion);
router.post("/api/submitAnswer", quizController.submitAnswer);
router.post("/api/diagnostic/submit", quizController.submitQuiz);

module.exports = router;
