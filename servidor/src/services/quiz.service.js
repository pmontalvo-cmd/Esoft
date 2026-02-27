const shuffle = require("../utils/shuffle");

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
if (!sessionCategoryCounts.has(userId)) sessionCategoryCounts.set(userId, {});
return sessionCategoryCounts.get(userId);
}

function selectNextQuestion({ userId, user, questions }) {
let { current_difficulty, grade } = user;

if (!current_difficulty || current_difficulty < 1 || current_difficulty > 4) {
    current_difficulty = mapGradeToDifficulty(grade);
}

const answered = getAnsweredSet(userId);
const counts = getCategoryCounts(userId);

let available = questions.filter(
    (q) => q.difficulty === current_difficulty && !answered.has(q.id)
);

if (available.length === 0) {
    sessionAnsweredQuestions.set(userId, new Set());
    sessionCategoryCounts.set(userId, {});
    const answered2 = getAnsweredSet(userId);

    available = questions.filter(
    (q) => q.difficulty === current_difficulty && !answered2.has(q.id)
    );

    available = shuffle(available);
    if (available.length === 0) {
    return { error: "No new questions available. Try again later." };
    }

    const question = available[0];
    answered2.add(question.id);
    const counts2 = getCategoryCounts(userId);
    counts2[question.category] = (counts2[question.category] || 0) + 1;
    return { question, current_difficulty };
}

const categories = [...new Set(available.map((q) => q.category))];
if (categories.length === 0) return { error: "No categories available." };

let pickCat = categories[0];
let best = counts[pickCat] || 0;

for (const cat of categories) {
    const c = counts[cat] || 0;
    if (c < best) {
    best = c;
    pickCat = cat;
    }
}

const candidates = shuffle(available.filter((q) => q.category === pickCat));
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