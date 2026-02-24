import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import API from "../../services/api";

export default function BlockDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [block, setBlock] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(`/api/learningblocks/${id}`);
        if (!res.data?.ok) throw new Error("Servidor respondió no-ok");

        setBlock(res.data.block);
      } catch (e) {
        setError(e?.message || "Error cargando el learning block");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </Container>
    );
  }

  // content puede venir como string JSON o ya como objeto
  let content = block?.content;
  if (typeof content === "string") {
    try { content = JSON.parse(content); } catch {}
  }

  return (
    <Container className="mt-4">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Volver
      </Button>

      <Card className="p-4 shadow-sm">
        <h2 className="mb-1">{block.title}</h2>
        <p className="text-muted mb-3">
          {block.subject} · Nivel {block.level} · {block.estimated_minutes} min
        </p>

        <h5>Resumen</h5>
        <p>{block.summary}</p>

        <hr />

        <h5>Contenido</h5>

        {/* Render simple: si es texto/objeto, lo mostramos sin romper */}
        {typeof content === "string" ? (
          <p>{content}</p>
        ) : (
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(content, null, 2)}
          </pre>
        )}
      </Card>
    </Container>
  );
}