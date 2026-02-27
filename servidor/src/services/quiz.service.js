const shuffle = require("../utils/shuffle");

// Memoria RAM por sesión
const sessionAnsweredQuestions = new Map();
function mapGradeToDifficulty(grade) {
    if (grade <= 3) return 1; // beginner
    if (grade <= 5) return 2; // intermediate
    if (grade <= 8) return 3; // moderate
    return 4; // advanced
}

function getAnsweredSet(userId) {
    if (!sessionAnsweredQuestions.has(userId)) {
        sessionAnsweredQuestions.set(userId, new Set());
    }
    return sessionAnsweredQuestions.get(userId);
}

function selectNextQuestion({ userId, user, questions }) {
    let { current_difficulty, grade } = user;

    if (!current_difficulty || current_difficulty < 1 || current_difficulty > 4) {
        current_difficulty = mapGradeToDifficulty(grade);
    }

    const answered = getAnsweredSet(userId);

    const availableLanguage = questions.filter(
        (q) =>
            q.category === "language" &&
            q.difficulty === current_difficulty &&
            !answered.has(q.id),
    );

    const availableMath = questions.filter(
        (q) =>
            q.category === "math" &&
            q.difficulty === current_difficulty &&
            !answered.has(q.id),
    );

    // Balance simple: cada 3 preguntas, intenta math si hay
    let availableQuestions;
    if (answered.size % 3 === 0 && availableMath.length > 0) {
        availableQuestions = availableMath;
    } else {
        availableQuestions =
            availableLanguage.length > 0 ? availableLanguage : availableMath;
    }

    // Reset si no hay más
    if (availableQuestions.length === 0) {
        sessionAnsweredQuestions.set(userId, new Set());

        // vuelve a calcular después de reset
        const answered2 = getAnsweredSet(userId);

        const allAtDifficulty = questions.filter(
            (q) => q.difficulty === current_difficulty && !answered2.has(q.id),
        );

        availableQuestions = shuffle(allAtDifficulty);
    }

    if (availableQuestions.length === 0) {
        return { error: "No new questions available. Try again later." };
    }

    const question = availableQuestions[0];

    // marcar como respondida
    answered.add(question.id);

    return { question, current_difficulty };
}

function gradeAnswerAndAdjustDifficulty({ currentDiff, isCorrect }) {
    let newDiff = currentDiff;

    if (isCorrect) {
        if (newDiff < 4) newDiff++;
    } else {
        if (newDiff > 1) newDiff--;
    }

    return newDiff;
}

module.exports = {
    mapGradeToDifficulty,
    getAnsweredSet,
    selectNextQuestion,
    gradeAnswerAndAdjustDifficulty,
};

const path = require("path");
const {questions} = require("../data/quizData")