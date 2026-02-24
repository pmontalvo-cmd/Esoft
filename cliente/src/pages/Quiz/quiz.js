// quiz.js
import React, { useEffect, useState } from "react";
import { Container, Card, Button, Spinner, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const QUIZ_SECONDS = 60;      // ajusta si quieres
const TOTAL_QUESTIONS = 10;   // ajusta si quieres

const Quiz = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [timeLeft, setTimeLeft] = useState(QUIZ_SECONDS);
  const [questionCount, setQuestionCount] = useState(0);

  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [mathScore, setMathScore] = useState(0);
  const [languageScore, setLanguageScore] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);

    if (!id) {
      setLoading(false);
      setError("No se encontró userId. Inicia sesión.");
      return;
    }

    fetchNextQuestion(id);

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          finishQuiz(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNextQuestion = async (id) => {
    try {
      setLoading(true);
      setError("");
      setSelectedOption(null);
      setFeedback(null);

      const res = await api.get(`/api/nextQuestion/${id}`);
      setQuestion(res.data);
    } catch (e) {
      console.error(e);
      setError("No se pudo cargar la siguiente pregunta.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (option) => {
    if (!question || selectedOption) return;

    setSelectedOption(option);

    try {
      const res = await api.post("/api/submitAnswer", {
        userId: Number(userId),
        questionId: Number(question.id),
        userAnswer: option,
      });

      const correct = !!res.data?.correct;
      setFeedback(correct ? "Correcto ✅" : "Incorrecto ❌");

      // Tu backend solo maneja math/language en quizData :contentReference[oaicite:4]{index=4}
      if (correct) {
        if (question.category === "math") setMathScore((s) => s + 1);
        if (question.category === "language") setLanguageScore((s) => s + 1);
      }

      // Avanza conteo
      setQuestionCount((c) => {
        const next = c + 1;
        if (next >= TOTAL_QUESTIONS) {
          // termina
          setTimeout(() => finishQuiz(userId), 500);
        } else {
          // siguiente pregunta
          setTimeout(() => fetchNextQuestion(userId), 500);
        }
        return next;
      });
    } catch (e) {
      console.error(e);
      setError("Error enviando respuesta.");
      setSelectedOption(null);
      setFeedback(null);
    }
  };

  const finishQuiz = async (id) => {
    try {
      setLoading(true);
      setError("");

      await api.post("/api/diagnostic/submit", {
        userId: Number(id),
        math_score: mathScore,
        language_score: languageScore,
      });
    } catch (e) {
      console.error(e);
      // no bloquees navegación si falla, pero sí muestra error si quieres
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Card className="p-4">
          <h4>Error</h4>
          <p>{error}</p>
          <Button onClick={() => navigate("/login")}>Ir a Login</Button>
        </Card>
      </Container>
    );
  }

  if (!question) {
    return (
      <Container className="mt-5">
        <Card className="p-4">
          <p>No hay pregunta disponible.</p>
          <Button onClick={() => finishQuiz(userId)}>Terminar</Button>
        </Card>
      </Container>
    );
  }

  const progressTime = (timeLeft / QUIZ_SECONDS) * 100;
  const progressQuestions = (questionCount / TOTAL_QUESTIONS) * 100;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h3 className="mb-2">Diagnostic Quiz</h3>

        <div className="mb-2">
          <small>Tiempo: {timeLeft}s</small>
          <ProgressBar now={progressTime} className="mb-3" />
        </div>

        <div className="mb-3">
          <small>
            Progreso: {questionCount}/{TOTAL_QUESTIONS}
          </small>
          <ProgressBar now={progressQuestions} />
        </div>

        {feedback && <h5 className="mb-3">{feedback}</h5>}

        <h5 className="mb-3">{question.question}</h5>

        <div className="d-flex flex-wrap gap-2">
          {question.options.map((opt) => {
            let variant = "primary";
            if (selectedOption) {
              if (opt === question.answer) variant = "success";
              else if (opt === selectedOption) variant = "danger";
              else variant = "secondary";
            }

            return (
              <Button
                key={opt}
                variant={variant}
                disabled={!!selectedOption}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </Button>
            );
          })}
        </div>

        <div className="mt-4 d-flex justify-content-between">
          <div>
            <small>Math: {mathScore} | Language: {languageScore}</small>
          </div>
          <Button variant="outline-dark" onClick={() => finishQuiz(userId)}>
            Terminar
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Quiz;