const shuffle = require("../utils/shuffle");

// Memoria RAM por sesión
const sessionAnsweredQuestions = new Map();
const sessionCategoryCounts = new Map();

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

function getCategoryCounts(userId) {
if (!sessionCategoryCounts.has(userId)) {
    sessionCategoryCounts.set(userId, {});
}
return sessionCategoryCounts.get(userId);
}

function selectNextQuestion({ userId, user, questions }) {
let { current_difficulty, grade } = user;

if (!current_difficulty || current_difficulty < 1 || current_difficulty > 4) {
    current_difficulty = mapGradeToDifficulty(grade);
}

const answered = getAnsweredSet(userId);
const counts = getCategoryCounts(userId);

// 1) Pool: todas las categorías, misma dificultad, no respondidas
const pool = questions.filter(
    (q) => q.difficulty === current_difficulty && !answered.has(q.id)
);

// Reset si no hay nada en esta dificultad
if (pool.length === 0) {
    sessionAnsweredQuestions.set(userId, new Set());
    sessionCategoryCounts.set(userId, {});
    const answered2 = getAnsweredSet(userId);

    const pool2 = questions.filter(
    (q) => q.difficulty === current_difficulty && !answered2.has(q.id)
    );

    if (pool2.length === 0) {
    return { error: "No new questions available. Try again later." };
    }

    const shuffled = shuffle(pool2);
    const question = shuffled[0];
    answered2.add(question.id);
    sessionCategoryCounts.get(userId)[question.category] =
    (sessionCategoryCounts.get(userId)[question.category] || 0) + 1;

    return { question, current_difficulty };
}

// 2) Balance: elige la categoría menos usada en esta sesión (entre las disponibles)
const categoriesAvailable = [...new Set(pool.map((q) => q.category))];

let bestCat = categoriesAvailable[0];
let bestCount = counts[bestCat] || 0;

for (const cat of categoriesAvailable) {
    const c = counts[cat] || 0;
    if (c < bestCount) {
    bestCount = c;
    bestCat = cat;
    }
}

// 3) Escoge una pregunta de esa categoría
const candidates = shuffle(pool.filter((q) => q.category === bestCat));
const question = candidates[0];

answered.add(question.id);
counts[question.category] = (counts[question.category] || 0) + 1;

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