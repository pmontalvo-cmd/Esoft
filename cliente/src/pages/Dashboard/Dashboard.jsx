// Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Spinner, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";
import { t, subjectLabel } from "../../i18n";


const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState(null);
  const [recommendedBlocks, setRecommendedBlocks] = useState([]);

  // Barra de búsqueda
  const [searchQ, setSearchQ] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchErr, setSearchErr] = useState("");
  const [searchReqId, setSearchReqId] = useState(0);
  const searchReqRef = useRef(0);

  const userId = localStorage.getItem("userId");

const runSearch = async (e) => {
  e?.preventDefault?.();

  const reqId = ++searchReqRef.current;

  try {
    setSearchErr("");
    setSearching(true);
    setSearchResults([]); // limpia SIEMPRE

    if (!userId) throw new Error("No hay userId en localStorage.");

    const q = searchQ.trim();
    if (!q) return;

    const res = await API.get(`/api/dashboard/${userId}/search`, {
      params: { q, limit: 12 }
    });

    if (reqId !== searchReqRef.current) return; // llegó tarde -> ignora

    const blocks = res.data.blocks ?? [];
    const unique = Array.from(new Map(blocks.map(b => [b.id, b])).values());
    setSearchResults(unique);
  } catch (err) {
    if (reqId !== searchReqRef.current) return;
    setSearchErr(err.message || "Error buscando");
  } finally {
    if (reqId !== searchReqRef.current) return;
    setSearching(false);
  }
};

  useEffect(() => {
      if (!searchQ.trim()) setSearchResults([]);
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        if (!userId) throw new Error("No hay userId en localStorage.");

        const res = await API.get(`/api/dashboard/${userId}`);
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
  }, [userId], [searchQ] );

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const qFromUrl = params.get("q");

  if (qFromUrl) {
    setSearchQ(qFromUrl);
    // Ejecutar búsqueda automática
    setTimeout(() => {
      runSearch();
    }, 0);
  }
}, [location.search]);

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
          <h3>{t("msg_error")}</h3>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>{t("msg_retry")}</Button>
        </Card>
      </Container>
    );
  }

  return (
    <div className="dashboard-page">
      <Container className="page dashboard-page">
        {/* Header */}
        <Row className="mb-3">
          <Col>
            <h2>{t("dash_title")}</h2>
            {user && <p>Usuario ID: {user.id} | Grado: {user.grade}</p>}
          </Col>
        </Row>

        {/* Search */}
        <Row className="mb-4">
          <Col>
            <Card className="panel p-3">
              <Form onSubmit={runSearch}>
                <div style={{ display: "flex", gap: 10 }}>
                  <Form.Control
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    placeholder={t("dash_search_placeholder")}
                  />
                  <Button type="submit" disabled={searching}>
                    {t("dash_search_btn")}
                  </Button>
                </div>
              </Form>

              {searchErr && <p style={{ marginTop: 10, color: "#b42318" }}>{searchErr}</p>}

              {searchResults.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <h5 className="mb-2">{t("dash_results")}</h5>
                  <Row xs={1} md={2} className="g-3">
                    {searchResults.map((block) => (
                      <Col key={block.id}>
                        <Card className="panel block-card">
                          <Card.Body>
                            <Card.Title>{block.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {block.subject} · {t("level")} {block.level} · {block.estimated_minutes} {t("minutes")}
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
                            <Button className="w-100" onClick={() => navigate(`/blocks/${block.id}`)}>
                              {t("btn_open")}
                            </Button>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {/* Recommended */}
        <Row className="dashboard-grid">
          <Col md={8}>
            <h4 className="mb-3">{t("dash_recomended")}</h4>

            <Row xs={1} md={2} className="g-3">
              {recommendedBlocks.map((block) => (
                <Col key={block.id}>
                  <Card className="panel block-card">
                    <Card.Body>
                      <Card.Title>{block.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {block.subject} · {t("level")} {block.level} · {block.estimated_minutes} {t("minutes")}
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
                      <Button className="w-100" onClick={() => navigate(`/blocks/${block.id}`)}>
                        {t("btn_start")}
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>

            {recommendedBlocks.length === 0 && (
              <Card className="p-3">
                <p className="mb-0">{t("dash_recomended_negate")}</p>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;