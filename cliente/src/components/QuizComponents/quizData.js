// quizData.js
// CommonJS export style for Node.js

const quizData = {
  title: "Diagnostic Quiz",
  questions: [
    // No label, but let's assume they're also "Beginner" (difficulty=1)
    {
      id: 1,
      category: "math",
      difficulty: 1, // 1=Beginner
      question: "What is 5 + 3?",
      options: ["6", "7", "8", "9"],
      answer: "8",
    },
    {
      id: 2,
      category: "language",
      difficulty: 1, // 1=Beginner
      question: "Which is a noun?",
      options: ["Run", "Happy", "Apple", "Quickly"],
      answer: "Apple",
    },
    /* Beginner (IDs 3..12, all difficulty=1) */
    {
      id: 3,
      category: "math",
      difficulty: 1,
      question: "What is 7 + 5?",
      options: ["10", "11", "12", "13"],
      answer: "12"
    },
    {
      id: 4,
      category: "math",
      difficulty: 1,
      question: "What is 9 - 4?",
      options: ["3", "4", "5", "6"],
      answer: "5"
    },
    {
      id: 5,
      category: "math",
      difficulty: 1,
      question: "What is 3 × 3?",
      options: ["6", "7", "8", "9"],
      answer: "9"
    },
    {
      id: 6,
      category: "math",
      difficulty: 1,
      question: "What is 16 ÷ 4?",
      options: ["2", "3", "4", "5"],
      answer: "4"
    },
    {
      id: 7,
      category: "math",
      difficulty: 1,
      question: "What is the next number in the sequence: 2, 4, 6, ...?",
      options: ["7", "8", "9", "10"],
      answer: "8"
    },
    {
      id: 8,
      category: "math",
      difficulty: 1,
      question: "What is 5 + 9?",
      options: ["13", "14", "15", "16"],
      answer: "14"
    },
    {
      id: 9,
      category: "math",
      difficulty: 1,
      question: "What is 8 - 3?",
      options: ["4", "5", "6", "7"],
      answer: "5"
    },
    {
      id: 10,
      category: "math",
      difficulty: 1,
      question: "What is 4 × 2?",
      options: ["6", "7", "8", "9"],
      answer: "8"
    },
    {
      id: 11,
      category: "math",
      difficulty: 1,
      question: "What is 20 ÷ 5?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      id: 12,
      category: "math",
      difficulty: 1,
      question: "What is the next number in the sequence: 1, 3, 5, ...?",
      options: ["6", "7", "8", "9"],
      answer: "7"
    },
    /* Intermediate (IDs 13..22, difficulty=2) */
    {
      id: 13,
      category: "math",
      difficulty: 2,
      question: "What is 15 × 3?",
      options: ["30", "35", "40", "45"],
      answer: "45"
    },
    {
      id: 14,
      category: "math",
      difficulty: 2,
      question: "What is 81 ÷ 9?",
      options: ["7", "8", "9", "10"],
      answer: "9"
    },
    {
      id: 15,
      category: "math",
      difficulty: 2,
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      answer: "8"
    },
    {
      id: 16,
      category: "math",
      difficulty: 2,
      question: "What is 12²?",
      options: ["124", "134", "144", "154"],
      answer: "144"
    },
    {
      id: 17,
      category: "math",
      difficulty: 2,
      question: "What is 25% of 200?",
      options: ["25", "50", "75", "100"],
      answer: "50"
    },
    {
      id: 18,
      category: "math",
      difficulty: 2,
      question: "What is 14 × 4?",
      options: ["52", "54", "56", "58"],
      answer: "56"
    },
    {
      id: 19,
      category: "math",
      difficulty: 2,
      question: "What is 100 ÷ 25?",
      options: ["2", "3", "4", "5"],
      answer: "4"
    },
    {
      id: 20,
      category: "math",
      difficulty: 2,
      question: "What is the square root of 81?",
      options: ["7", "8", "9", "10"],
      answer: "9"
    },
    {
      id: 21,
      category: "math",
      difficulty: 2,
      question: "What is 11²?",
      options: ["111", "121", "131", "141"],
      answer: "121"
    },
    {
      id: 22,
      category: "math",
      difficulty: 2,
      question: "What is 30% of 150?",
      options: ["35", "40", "45", "50"],
      answer: "45"
    },
    /* Moderate (IDs 23..29, difficulty=3) */
    {
      id: 23,
      category: "math",
      difficulty: 3,
      question: "Solve for x: 2x + 3 = 11",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      id: 24,
      category: "math",
      difficulty: 3,
      question: "What is the value of π (pi) to two decimal places?",
      options: ["3.12", "3.14", "3.16", "3.18"],
      answer: "3.14"
    },
    {
      id: 25,
      category: "math",
      difficulty: 3,
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²", "2x²"],
      answer: "2x"
    },
    {
      id: 26,
      category: "math",
      difficulty: 3,
      question: "What is the integral of 2x dx?",
      options: ["x² + C", "2x² + C", "x²", "2x²"],
      answer: "x² + C"
    },
    {
      id: 27,
      category: "math",
      difficulty: 3,
      question: "What is the solution to the equation x² - 4 = 0?",
      options: ["x = 2", "x = -2", "x = ±2", "x = 0"],
      answer: "x = ±2"
    },
    {
      id: 28,
      category: "math",
      difficulty: 3,
      question: "Solve for y: 3y - 5 = 16",
      options: ["5", "6", "7", "8"],
      answer: "7"
    },
    {
      id: 29,
      category: "math",
      difficulty: 3,
      question: "What is the value of e (Euler's Number) to two decimal places?",
      options: ["2.71", "2.72", "2.73", "2.74"],
      answer: "2.71"
    },
  /*Math Advanced */
    {
      id: 30,
      category: "math",
      difficulty: 4,
      question: "What is the derivative of 3x²?",
      options: ["3x", "6x", "x²", "9x"],
      answer: "6x"
    },
    {
      id: 31,
      category: "math",
      difficulty: 4,
      question: "What is the integral of 4x dx?",
      options: ["4x² + C", "2x² + C", "8x + C", "x²"],
      answer: "2x² + C"
    },
    {
      id: 32,
      category: "math",
      difficulty: 4,
      question: "What is the solution to the equation 2x² - 8 = 0?",
      options: ["x = ±4", "x = 2", "x = ±2", "x = 0"],
      answer: "x = ±2"
    },
    {
      id: 33,
      category: "math",
      difficulty: 4,
      question: "What is the logarithm base 10 of 1000?",
      options: ["1", "2", "3", "4"],
      answer: "3"
    },
    {
      id: 34,
      category: "math",
      difficulty: 4,
      question: "If f(x) = x³ - 4x, what is f'(2)?",
      options: ["4", "8", "12", "16"],
      answer: "8"
    },
    /* language (Beginner, IDs 30..34 => difficulty=1) */

    {
      id: 35,
      category: "language",
      difficulty: 1,
      question: "Which word is a noun in the sentence: 'The cat sleeps on the sofa'?",
      options: ["The", "cat", "sleeps", "on"],
      answer: "cat"
    },
    {
      id: 36,
      category: "language",
      difficulty: 1,
      question: "Which word is an adjective in the sentence: 'The quick fox jumped'?",
      options: ["quick", "fox", "jumped", "The"],
      answer: "quick"
    },
    {
      id: 37,
      category: "language",
      difficulty: 1,
      question: "Choose the correct indefinite article for the word 'apple'.",
      options: ["an", "a", "the", "no article needed"],
      answer: "an"
    },
    {
      id: 38,
      category: "language",
      difficulty: 1,
      question: "Which word is a pronoun in the sentence: 'He walked to the store'?",
      options: ["store", "walked", "He", "to"],
      answer: "He"
    },
    {
      id: 39,
      category: "language",
      difficulty: 1,
      question: "Which sentence is correct?",
      options: [
        "I is happy.",
        "I am happy.",
        "I are happy.",
        "I be happy."
      ],
      answer: "I am happy."
    },
    /* language (Medium => we’ll label as Intermediate = 2) (IDs 35..39) */
    {
      id: 40,
      category: "language",
      difficulty: 2,
      question: "Which of the following is the correct plural form of 'mouse'?",
      options: ["mouses", "mouse's", "mice", "mices"],
      answer: "mice"
    },
    {
      id: 41,
      category: "language",
      difficulty: 2,
      question: "In the sentence: 'She sings beautifully,' which word is an adverb?",
      options: ["She", "sings", "beautifully", "None"],
      answer: "beautifully"
    },
    {
      id: 42,
      category: "language",
      difficulty: 2,
      question: "Which sentence uses 'there,' 'their,' and 'they're' correctly?",
      options: [
        "There going to finish their homework over they're.",
        "Their going to finish they're homework over there.",
        "They're going to finish their homework over there.",
        "They're going to finish there homework over their."
      ],
      answer: "They're going to finish their homework over there."
    },
    {
      id: 43,
      category: "language",
      difficulty: 2,
      question: "Which of the following is an example of a comparative adjective?",
      options: ["good", "better", "best", "well"],
      answer: "better"
    },
    {
      id: 44,
      category: "language",
      difficulty: 2,
      question: "Which sentence is punctuated correctly?",
      options: [
        "She said 'I'm hungry.'",
        "She said, 'I'm hungry.'",
        "She said, 'I'm hungry' .",
        "She said I'm hungry."
      ],
      answer: "She said, 'I'm hungry.'"
    },
    /* language (Moderate => 3) (IDs 40..44) */
    {
      id: 45,
      category: "language",
      difficulty: 3,
      question: "Which sentence maintains proper subject-verb agreement?",
      options: [
        "Each of the students are ready for the test.",
        "Each of the students is ready for the test.",
        "Each of the student are ready for the test.",
        "Each students are ready for the test."
      ],
      answer: "Each of the students is ready for the test."
    },
    {
      id: 46,
      category: "language",
      difficulty: 3,
      question: "Identify the subordinating conjunction in the sentence: 'I will go out unless it rains.'",
      options: ["I", "will", "unless", "it"],
      answer: "unless"
    },
    {
      id: 47,
      category: "language",
      difficulty: 3,
      question: "Which sentence uses the correct pronoun case?",
      options: [
        "Me and him went to the store.",
        "Him and I went to the store.",
        "He and me went to the store.",
        "He and I went to the store."
      ],
      answer: "He and I went to the store."
    },
    {
      id: 48,
      category: "language",
      difficulty: 3,
      question: "In the sentence: 'Walking along the beach, she found a seashell,' what is the function of 'Walking along the beach'?",
      options: [
        "A gerund phrase functioning as the subject",
        "A participial phrase describing 'she'",
        "A prepositional phrase",
        "A noun clause"
      ],
      answer: "A participial phrase describing 'she'"
    },
    {
      id: 49,
      category: "language",
      difficulty: 3,
      question: "Which sentence uses an infinitive phrase correctly?",
      options: [
        "I want to quickly run in the marathon this year.",
        "I want quickly to run in the marathon this year.",
        "I want to run quickly in the marathon this year.",
        "I want run to quickly in the marathon this year."
      ],
      answer: "I want to run quickly in the marathon this year."
    },
    /* language (Advanced => 4) (IDs 45..49) */
    {
      id: 50,
      category: "language",
      difficulty: 4,
      question: "Which sentence uses the subjunctive mood correctly?",
      options: [
        "If I was you, I would study harder.",
        "I wish I were on vacation now.",
        "I suggest that he goes to the doctor.",
        "If she was here, we'd start the meeting."
      ],
      answer: "I wish I were on vacation now."
    },
    {
      id: 51,
      category: "language",
      difficulty: 4,
      question: "Which of the following sentences contains a correctly used past perfect tense?",
      options: [
        "I had finished my dinner before he arrived.",
        "I have finished my dinner before he arrives.",
        "I finished my dinner before he arrived.",
        "I will have finished my dinner before he arrived."
      ],
      answer: "I had finished my dinner before he arrived."
    },
    {
      id: 52,
      category: "language",
      difficulty: 4,
      question: "Which sentence demonstrates correct parallel structure?",
      options: [
        "She likes reading, to dance, and going swimming.",
        "She likes reading, dancing, and swimming.",
        "She likes to read, dance, and swimming.",
        "She likes reading, dancing, and to swim."
      ],
      answer: "She likes reading, dancing, and swimming."
    },
    {
      id: 53,
      category: "language",
      difficulty: 4,
      question: "Which of the following sentences properly uses a restrictive clause?",
      options: [
        "My brother, who lives in Spain, called me yesterday.",
        "The book that I borrowed from you is on the table.",
        "My car, which is red, needs a new engine.",
        "The books, which have red covers, are on sale."
      ],
      answer: "The book that I borrowed from you is on the table."
    },
    {
      id: 54,
      category: "language",
      difficulty: 4,
      question: "Which sentence shows correct placement of a semicolon?",
      options: [
        "I have a big test tomorrow; I can't go out tonight.",
        "I have a big test tomorrow,; I can't go out tonight.",
        "I have a big test; tomorrow I can't go out tonight.",
        "I have a big test tomorrow: I can't go out tonight."
      ],
      answer: "I have a big test tomorrow; I can't go out tonight."
    },
  ],
};

module.exports = quizData;