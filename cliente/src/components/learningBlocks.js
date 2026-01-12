// learningBlocks.js
export const learningBlocks = [
    {
      id: 1,
      title: "Basic Math Concepts",
      description: "Learn the fundamentals of addition, subtraction, multiplication, and division.",
      path1: '/mateBasico',
      path2: '/mateBasico',
      bLabel1: "Aritmetics",
      criteria: (score) => score.math < 5,
    },
    {
      id: 2,
      title: "Advanced Math Topics",
      description: "Dive deeper into algebra, geometry, and calculus.",
      path1: "/mateAvanzado",
      path2: '/mateAvanzado',
      bLabel1: "Calculus",
      criteria: (score) => score.math >= 5,
    },
    {
      id: 3,
      title: "Grammar Basics",
      description: "Understand the parts of speech and sentence structure.",
      path1: "/lenguajeBasico",
      path2: '/lenguajeBasico',
      bLabel1: "Speech Structure",
      criteria: (score) => score.language < 5,
    },
    {
      id: 4,
      title: "Advanced Language Skills",
      description: "Enhance your vocabulary and comprehension.",
      path1: "/lenguajeAvanzado",
      path2: '/lenguajeAvanzado',
      bLabel1: "Lexicon & Undestanding",
      criteria: (score) => score.language >= 5,
    },
  ];
  