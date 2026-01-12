import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, ProgressBar } from 'react-bootstrap';

const Quiz = ({ userId, onComplete }) => {
  /* Question Tracking */
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);

  /* Fetch the first question */
  useEffect(() => {
    fetchNextQuestion();

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          FinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  /* Fetch next question from backend */
  const fetchNextQuestion = () => {
    setLoading(true);
    fetch(`http://192.168.100.6:3002/api/nextQuestion/${userId}?difficulty=${difficulty}`)
      .then((res) => res.json())
      .then((question) => {
        if (question.error) {
          alert(question.error);
          return;
        }
        setCurrentQuestion(question);
        setSelectedOption(null);
        setFeedback(null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  /* Handle answer submission */
  const handleAnswerClick = (option) => {
    if (!currentQuestion) return;


    setSelectedOption(option);

    fetch(`http://192.168.100.6:3002/api/submitAnswer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        questionId: currentQuestion.id,
        userAnswer: option
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }

        let newDifficulty = difficulty;

        if (data.correct) {
          setFeedback("Correct!");
        } else {
          setFeedback("Incorrect");
        }

        setUserAnswers((prev) => {
          const updatedAnswers = [
            ...prev,
            {
              questionId: currentQuestion.id,
              category: currentQuestion.category, // Store subject
              correctAnswer: currentQuestion.answer, // Store correct answer
              userAnswer: option, // Store user’s chosen answer
            }
          ];
          console.log("✅ Updated Answers Array AFTER setState:", updatedAnswers);
          return updatedAnswers;
        });

        newDifficulty = data.correct ? Math.min(difficulty + 1, 4) : Math.max(difficulty - 1, 1);

        setTimeout(() => {
          setDifficulty(newDifficulty);
          fetchNextQuestion();
        }, 1000);
      })
      .catch((err) => console.error(err));
  };

  /* Calculate Scores */
  const calculateScores = (answers) => {
    let mathScore = 0;
    let languageScore = 0;
  
    console.log("📊 User answers received in calculateScores():", answers);
  
    answers.forEach((answer) => {
      console.log("🔍 Checking answer:", answer);
      const correctAnswer = answer.correctAnswer.trim().toLowerCase();
      const userAnswer = answer.userAnswer.trim().toLowerCase();
  
      console.log(`👉 Correct: "${correctAnswer}", User: "${userAnswer}"`);
  
      if (correctAnswer === userAnswer) {
        console.log("✅ Matched!");
        if (answer.category === "math") {
          mathScore++;
        } else if (answer.category === "language") {
          languageScore++;
        }
      } else {
        console.log("❌ Not Matched!");
      }
    });
  
    console.log("✅ Final Calculated Scores => Math:", mathScore, "Language:", languageScore);
    return { math: mathScore, language: languageScore };
  };


  const [quizFinished, setQuizFinished] = useState(false);

useEffect(() => {
  if (quizFinished) {
    console.log("📢 Running calculateScores() after userAnswers update:", userAnswers);
    const quizScores = calculateScores(userAnswers);
    
    console.log("🔥 Final quizScores AFTER state update:", quizScores);
    onComplete(quizScores);
    navigate('/dashboard', { state: { scores: quizScores } });
  }
}, [quizFinished, userAnswers]); // Runs when `quizFinished` or `userAnswers` changes


  /* Finish Quiz and Navigate to Dashboard */
  const FinishQuiz = () => {
    console.log("✅ Setting quizFinished to true...");
    setQuizFinished(true); // ✅ Triggers useEffect after state updates
  };
  

  if (loading) {
    return <Container>Loading question...</Container>;
  }

  if (!currentQuestion) {
    return <Container>No question available.</Container>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Adaptive Quiz</Card.Title>
          <ProgressBar now={(timeLeft / 60) * 100} label={`${timeLeft}s left`} className="mb-3" />
          {feedback && <h4>{feedback}</h4>}
          <Card.Text>{currentQuestion.question}</Card.Text>
          {currentQuestion.options.map((option) => {
            let variant = "primary";
            if (selectedOption) {
              if (option === currentQuestion.answer) {
                variant = "success";
              } else if (option === selectedOption) {
                variant = "danger";
              } else {
                variant = "secondary";
              }
            }
            return (
              <Button
                key={option}
                variant={variant}
                onClick={() => handleAnswerClick(option)}
                className="m-2"
                disabled={!!selectedOption}
                block
              >
                {option}
              </Button>
            );
          })}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Quiz;