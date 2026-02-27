function selectNextQuestion({ userId, user, questions }) {
    let { current_difficulty, grade } = user;

    if (!current_difficulty || current_difficulty < 1 || current_difficulty > 4) {
        current_difficulty = mapGradeToDifficulty(grade);
    }

    const answered = getAnsweredSet(userId);

    let availableQuestions = questions.filter(
        (q) =>
            q.difficulty === current_difficulty &&
            !answered.has(q.id),
    );

    availableQuestions = shuffle(availableQuestions);

    if (availableQuestions.length === 0) {
        sessionAnsweredQuestions.set(userId, new Set());

        const answered2 = getAnsweredSet(userId);

        availableQuestions = shuffle(
            questions.filter(
                (q) =>
                    q.difficulty === current_difficulty &&
                    !answered2.has(q.id),
            ),
        );
    }

    if (availableQuestions.length === 0) {
        return { error: "No new questions available. Try again later." };
    }

    const question = availableQuestions[0];

    answered.add(question.id);

    return { question, current_difficulty };
}
