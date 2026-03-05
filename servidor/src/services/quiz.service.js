// servidor/src/services/quiz.service.js
const shuffle = require("../utils/shuffle");

// Memoria RAM por sesión
const sessionAnsweredQuestions = new Map();

function mapGradeToDifficulty(grade) {
if (grade <= 3) return 1;
if (grade <= 5) return 2;
if (grade <= 8) return 3;
return 4;
}

function getAnsweredSet(userId) {
if (!sessionAnsweredQuestions.has(userId)) {
    sessionAnsweredQuestions.set(userId, new Set());
}
return sessionAnsweredQuestions.get(userId);
}

function getAllowedCategoriesFromTakes(user) {
const allowed = [];

// En DB: takes_lenguage | En quiz: language
if (Number(user.takes_math) === 1) allowed.push("math");
if (Number(user.takes_lenguage) === 1) allowed.push("language");
if (Number(user.takes_science) === 1) allowed.push("science");
if (Number(user.takes_social) === 1) allowed.push("social");
if (Number(user.takes_tech) === 1) allowed.push("tech");
if (Number(user.takes_finance) === 1) allowed.push("finance");
if (Number(user.takes_logic) === 1) allowed.push("logic");

// Fallback si todo está en 0
if (allowed.length === 0) return ["math", "language"];
return allowed;
}

function selectNextQuestion({ userId, user, questions }) {
let { current_difficulty, grade } = user;

current_difficulty = Number(current_difficulty);
grade = Number(grade);

if (!current_difficulty || current_difficulty < 1 || current_difficulty > 4) {
    current_difficulty = mapGradeToDifficulty(grade);
}

let answered = getAnsweredSet(userId);
const allowedCategories = getAllowedCategoriesFromTakes(user);

// 1) Misma dificultad + categorías permitidas + no respondidas
let available = questions.filter(
    (q) =>
    allowedCategories.includes(q.category) &&
    Number(q.difficulty) === current_difficulty &&
    !answered.has(q.id)
);

// 2) Si no hay, reinicia preguntas respondidas y vuelve a intentar misma dificultad
if (available.length === 0) {
    sessionAnsweredQuestions.set(userId, new Set());
    answered = getAnsweredSet(userId);

    available = questions.filter(
    (q) =>
        allowedCategories.includes(q.category) &&
        Number(q.difficulty) === current_difficulty &&
        !answered.has(q.id)
    );
}

// 3) Último fallback: cualquier dificultad dentro de categorías permitidas
if (available.length === 0) {
    available = questions.filter(
    (q) =>
        allowedCategories.includes(q.category) &&
        !answered.has(q.id)
    );
}

available = shuffle(available);

if (available.length === 0) {
    return { error: "No new questions available. Try again later." };
}

const question = available[0];
answered.add(question.id);

return { question, current_difficulty };
}

function gradeAnswerAndAdjustDifficulty({ currentDiff, isCorrect }) {
let newDiff = Number(currentDiff);

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