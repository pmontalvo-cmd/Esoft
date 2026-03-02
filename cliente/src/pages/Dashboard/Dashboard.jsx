// Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Button, Spinner, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";
import { t, subjectLabel } from "../../i18n";


const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [blocks, setBlocks] = useState([]);
  const [viewMode, setViewMode] = useState("recommended"); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState(null);

  // Barra de búsqueda
  const [searchQ, setSearchQ] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchErr, setSearchErr] = useState("");
  const [searchReqId, setSearchReqId] = useState(0);
  const searchReqRef = useRef(0);


  //Estados para Cards de colores
  const tintClass =
  b.subject === "math" ? "card--tint-blue" :
  b.subject === "science" ? "card--tint-yellow" :
  b.subject === "language" ? "card--tint-red" :
  b.subject === "social" ? "card--tint-yellow" :
  b.subject === "finance" ? "card--tint-yellow" :
  b.subject === "tech" ? "card--tint-blue" :
  b.subject === "logic" ? "card--tint-red" :
  "";

  const userId = localStorage.getItem("userId");

const runSearch = async (e, forcedQ) => {
  e?.preventDefault?.();
  const reqId = ++searchReqRef.current;

  try {
    setSearchErr("");
    setSearching(true);
    setSearchResults([]);

    if (!userId) throw new Error("No hay userId en localStorage.");

    const q = (forcedQ ?? searchQ).trim();
    if (!q) return;

    const res = await API.get(`/api/dashboard/${userId}/search`, { params: { q, limit: 12 } });

    if (reqId !== searchReqRef.current) return;

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
  const params = new URLSearchParams(location.search);
  const qFromUrl = params.get("q");
  if (qFromUrl) {
    setSearchQ(qFromUrl);
    runSearch(null, qFromUrl);
  }
}, [location.search]);

  const fetchBlocks = async (mode) => {
    try {
      setLoading(true);
      setError("");

      if (!userId) throw new Error("No hay userId en localStorage.");

      const endpoint =
        mode === "recommended"
          ? `/api/dashboard/${userId}`
          : `/api/learningblocks`;

    const res = await API.get(endpoint);
    const data = res.data;

    let list;

    if (mode === "recommended") {
      if (!data?.ok) throw new Error("Respuesta del servidor no OK.");

      if (data.user) setUser(data.user);
      if (data.scores) setScores(data.scores);

      list = data.recommendedBlocks ?? [];
    } else {
      // /api/learningblocks probablemente devuelve array directo
      list = Array.isArray(data) ? data : data.blocks ?? [];
    }

    setBlocks(list);
    } catch (e) {
      setError(e.message || "Error cargando bloques");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchBlocks(viewMode);}, [viewMode, userId]);




// Manage Loading and Error
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


  // Return
  return (
  <div className="page-shell">
    <div className="hero-band">
    <div className="dashboard-page">
      <Container className="page dashboard-page">
        {/* Header */}
        <Row className="mb-3">
          <Col>
            <h1 className="page-title">{t("dash_title")}</h1>
            {user && <p className="page-subtitle">Usuario ID: {user.id} | Grado: {user.grade}</p>}
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
                  <Row xs={1} md={2} lg={3} className="g-3">
                    {searchResults.map((block) => (
                      <Col key={block.id}>
                        <Card className={`panel block-card ${tintClass}`}>
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
      </Container>
      </div>

        {/* Recommended */}
        <Container className="py-4">
        <Row className="dashboard-grid">
          <Col md={12}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <h4 className="mb-3">
            {viewMode === "recommended" ? t("dash_recommended") : t("dash_all_blocks")}
            </h4>

            <Button
            variant="outline-primary"
            onClick={() => setViewMode(v => (v === "recommended" ? "all" : "recommended"))}
            >
            {viewMode === "recommended" ? t("btn_show_all") : t("btn_show_recommended")}
            </Button>
            </div>
            

            <Row xs={1} md={2} lg={3} className="g-3">
              {blocks.map((block) => (
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

            {blocks.length === 0 && (
              <Card className="p-3">
                <p className="mb-0">
                  {viewMode === "recommended"
                    ? t("dash_recommended_negate")
                    : t("dash_all_negate")}
                </p>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  </div>
  );
};

export default Dashboard;