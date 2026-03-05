import React, {  useRef, useEffect, useState } from "react";
import { Container, Card, Button, Spinner, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import Swal from 'sweetalert2';

const QUIZ_SECONDS = 120;
const TOTAL_QUESTIONS = 40; 

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
  const [financeScore, setFinanceScore] = useState(0);
  const [scienceScore, setScienceScore] = useState(0);
  const [logicScore, setLogicScore] = useState(0);
  const [techScore, setTechScore] = useState(0);
  const [socialScore, setSocialScore] = useState(0);

  const mathScoreRef = useRef(0);
  const languageScoreRef = useRef(0);
  const scienceScoreRef = useRef(0);
  const socialScoreRef = useRef(0);
  const techScoreRef = useRef(0);
  const financeScoreRef = useRef(0);
  const logicScoreRef = useRef(0);

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
          setTimeout(() => finishQuiz(id), 500);
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

      const res = await API.get(`/api/nextQuestion/${id}`);
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
      const res = await API.post("/api/submitAnswer", {
        userId: Number(userId),
        questionId: Number(question.id),
        userAnswer: option,
      });

      const correct = !!res.data?.correct;
      setFeedback(correct ? "Correcto ✅" : "Incorrecto ❌");
      if (correct){
        Swal.fire({
            title: "<strong>Correcto</strong>",
            icon: 'success',
            timer: 500
        });
      } else {
        Swal.fire({
            title: "Incorrecto",
            icon: 'error',
            timer: 500
        });
      }

      if (correct) {
        if (question.category === "math") {
          setMathScore((s) => {
            const next = s + 1;
            mathScoreRef.current = next;
            return next;
          });
        }

        if (question.category === "language") {
          setLanguageScore((s) => {
            const next = s + 1;
            languageScoreRef.current = next;
            return next;
          });
        }

        if (question.category === "science") {
          setScienceScore((s) => {
            const next = s + 1;
            scienceScoreRef.current = next;
            return next;
          });
        }

        if (question.category === "social") {
          setSocialScore((s) => {
            const next = s + 1;
            socialScoreRef.current = next;
            return next;
          });
        }

        if (question.category === "tech") {
          setTechScore((s) => {
            const next = s + 1;
            techScoreRef.current = next;
            return next;
          });
        }

        if (question.category === "finance") {
          setFinanceScore((s) => {
            const next = s + 1;
            financeScoreRef.current = next;
            return next;
          });
        }

        if (question.category === "logic") {
          setLogicScore((s) => {
            const next = s + 1;
            logicScoreRef.current = next;
            return next;
          });
        }
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
    const takes = JSON.parse(localStorage.getItem("takes") || "{}");

    const takesBySubject = {
      math: Number(takes.takes_math ?? 0),
      language: Number(takes.takes_lenguage ?? 0), // en DB/localStorage sigue con typo
      science: Number(takes.takes_science ?? 0),
      social: Number(takes.takes_social ?? 0),
      tech: Number(takes.takes_tech ?? 0),
      finance: Number(takes.takes_finance ?? 0),
      logic: Number(takes.takes_logic ?? 0),
    };

    await API.post("/api/diagnostic/submit", {
      userId: Number(id),

      math_score: takesBySubject.math ? Math.max(1, mathScoreRef.current) : 0,
      language_score: takesBySubject.language ? Math.max(1, languageScoreRef.current) : 0,
      science_score: takesBySubject.science ? Math.max(1, scienceScoreRef.current) : 0,
      social_score: takesBySubject.social ? Math.max(1, socialScoreRef.current) : 0,
      tech_score: takesBySubject.tech ? Math.max(1, techScoreRef.current) : 0,
      finance_score: takesBySubject.finance ? Math.max(1, financeScoreRef.current) : 0,
      logic_score: takesBySubject.logic ? Math.max(1, logicScoreRef.current) : 0,
    });


      navigate("/quiz/done");
    } catch (err) {
      console.error("Error submitting diagnostic:", err);
      alert("Could not submit your answers. Please try again.");
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
<div className="page-shell">
<div className="hero-band--full">
<div className="page">
  <div className="container">
    <div className="quiz-shell">
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
            <small>Math: {mathScore} | Language: {languageScore} | Finance: {financeScore} | Logic: {logicScore} | Science: {scienceScore} | Social: {socialScore} | Tech: {techScore}</small>
          </div>
          <Button variant="outline-dark" onClick={() => finishQuiz(userId)}>
            Terminar
          </Button>
        </div>
      </Card>
    </Container>
    </div>
  </div>
</div>
</div>
</div>
  );
};

export default Quiz;
