// Dashboard.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState(null);
  const [recommendedBlocks, setRecommendedBlocks] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        if (!userId) throw new Error("No hay userId en localStorage.");

        const res = await api.get(`/api/dashboard/${userId}`);
        if (!res.data?.ok) throw new Error("Respuesta del servidor no OK.");

        setUser(res.data.user);
        setScores(res.data.scores);
        setRecommendedBlocks(res.data.recommendedBlocks ?? []);
      } catch (e) {
        setError(e.message || "Error cargando dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

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
          <h3>Error</h3>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>Dashboard</h2>
          {user && <p>Usuario ID: {user.id} | Grado: {user.grade}</p>}
        </Col>
      </Row>

      <Row>
        {/* Recommended Blocks */}
        <Col md={8}>
          <h4 className="mb-3">Recommended Learning Blocks</h4>

          <Row xs={1} md={2} className="g-3">
            {recommendedBlocks.map((block) => (
              <Col key={block.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{block.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {block.subject} · Nivel {block.level} · {block.estimated_minutes} min
                    </Card.Subtitle>
                    <Card.Text>{block.summary}</Card.Text>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {(block.tags ?? []).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 12,
                            padding: "2px 8px",
                            border: "1px solid #ddd",
                            borderRadius: 999,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Card.Body>

                  <Card.Footer style={{ background: "transparent" }}>
                    <Button
                      className="w-100"
                      onClick={() => navigate(`/blocks/${block.id}`)}
                    >
                      Empezar
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {recommendedBlocks.length === 0 && (
            <Card className="p-3">
              <p className="mb-0">No hay bloques recomendados todavía.</p>
            </Card>
          )}
        </Col>

        {/* Scores */}
        <Col md={4}>
          <h4 className="mb-3">Scores</h4>
          <Card className="p-3 shadow-sm">
            {scores ? (
              <>
                <p><strong>Math:</strong> {scores.math}</p>
                <p><strong>Science:</strong> {scores.science}</p>
                <p><strong>Language:</strong> {scores.language}</p>
                <p><strong>Social:</strong> {scores.social}</p>
                <p><strong>Tech:</strong> {scores.tech}</p>
                <p><strong>Finance:</strong> {scores.finance}</p>
                <p className="mb-0"><strong>Logic:</strong> {scores.logic}</p>
              </>
            ) : (
              <p className="mb-0">No hay scores.</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
