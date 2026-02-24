import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert, Badge, Form } from "react-bootstrap";
import API from "../../services/api";

/* ---------- utils ---------- */
function safeParseJSON(v) {
  if (v == null) return null;
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

function normalizeContent(content) {
  const obj = safeParseJSON(content) ?? content;
  if (!obj || typeof obj !== "object") return { sections: [] };
  const sections = Array.isArray(obj.sections) ? obj.sections : [];
  return { ...obj, sections };
}

function normalizeStr(x) {
  return (x ?? "").toString().trim().toLowerCase();
}

function SectionTypeBadge({ type }) {
  const t = (type ?? "").toString();
  return (
    <Badge bg="secondary" className="ms-2">
      {t}
    </Badge>
  );
}

/* ---------- sections ---------- */
function TextSection({ section }) {
  const text = (section?.markdown ?? "").toString();
  return (
    <div style={{ marginBottom: 16 }}>
      {text.split("\n").map((line, i) => (
        <p key={i} style={{ marginBottom: 10 }}>
          {line}
        </p>
      ))}
    </div>
  );
}

function LinkSection({ section }) {
  const url = section?.url;
  const label = section?.label || url;
  if (!url) return <Alert variant="warning">Link inválido: falta "url".</Alert>;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-2">
          Recurso <SectionTypeBadge type="link" />
        </Card.Title>
        <a href={url} target="_blank" rel="noreferrer">
          {label}
        </a>
      </Card.Body>
    </Card>
  );
}

function ImageSection({ section }) {
  const url = section?.url;
  const caption = section?.caption;
  if (!url) return <Alert variant="warning">Imagen inválida: falta "url".</Alert>;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-3">
          Imagen <SectionTypeBadge type="image" />
        </Card.Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={url}
            alt={caption || "learning block image"}
            style={{ maxWidth: "100%", borderRadius: 12, border: "1px solid #eee" }}
          />
        </div>
        {caption ? <div className="text-muted mt-2">{caption}</div> : null}
      </Card.Body>
    </Card>
  );
}

function VideoSection({ section }) {
  const url = section?.url;
  const title = section?.title;

  // ✅ hook siempre al inicio del componente (no condicional)
  const embedUrl = useMemo(() => {
    if (!url) return null;
    try {
      const u = new URL(url);

      if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
      }
      if (u.hostname.includes("youtu.be")) {
        const id = u.pathname.replace("/", "");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      return null;
    } catch {
      return null;
    }
  }, [url]);

  if (!url) return <Alert variant="warning">Video inválido: falta "url".</Alert>;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-2">
          {title || "Video"} <SectionTypeBadge type="video" />
        </Card.Title>

        {embedUrl ? (
          <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
            <iframe
              title={title || "Video"}
              src={embedUrl}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
                borderRadius: 12,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            <p className="text-muted mb-2">No se pudo generar embed. Abre el link:</p>
            <a href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

function ExerciseSection({ section }) {
  const prompt = section?.prompt || "Ejercicio";
  const answer = normalizeStr(section?.answer);
  const choices = Array.isArray(section?.choices) ? section.choices : null;

  const [value, setValue] = useState("");
  const [status, setStatus] = useState(null); // null | "ok" | "bad"

  const check = () => {
    const userAns = normalizeStr(value);
    if (!answer) return setStatus("bad");
    setStatus(userAns === answer ? "ok" : "bad");
  };

  const pickChoice = (c) => {
    setValue((c ?? "").toString());
    setStatus(null);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-2">
          Ejercicio <SectionTypeBadge type="exercise" />
        </Card.Title>

        <p className="mb-3">{prompt}</p>

        {choices && choices.length > 0 ? (
          <div className="mb-3" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {choices.map((c, idx) => (
              <Button key={idx} variant="outline-dark" onClick={() => pickChoice(c)}>
                {c}
              </Button>
            ))}
          </div>
        ) : null}

        <Form.Group className="mb-2">
          <Form.Control
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setStatus(null);
            }}
            placeholder="Tu respuesta..."
          />
        </Form.Group>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Button variant="dark" onClick={check}>
            Check
          </Button>
          {status === "ok" ? (
            <span style={{ color: "green" }}>Correcto ✅</span>
          ) : status === "bad" ? (
            <span style={{ color: "crimson" }}>Incorrecto ❌</span>
          ) : (
            <span className="text-muted"> </span>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

function UnknownSection({ section }) {
  return (
    <Alert variant="warning" className="mb-3">
      Sección desconocida: <b>{section?.type || "(sin type)"}</b>
      <pre className="mt-2 mb-0" style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(section, null, 2)}
      </pre>
    </Alert>
  );
}

function RenderSection({ section }) {
  if (!section || typeof section !== "object") return null;

  switch (section.type) {
    case "text":
      return <TextSection section={section} />;
    case "exercise":
      return <ExerciseSection section={section} />;
    case "video":
      return <VideoSection section={section} />;
    case "image":
      return <ImageSection section={section} />;
    case "link":
      return <LinkSection section={section} />;
    default:
      return <UnknownSection section={section} />;
  }
}

/* ---------- page ---------- */
export default function BlockDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ hooks siempre arriba
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [block, setBlock] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(`/api/learningblocks/${id}`);
        if (!res.data?.ok) throw new Error("Servidor respondió no-ok");

        if (!cancelled) setBlock(res.data.block);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Error cargando el learning block");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // ✅ hooks antes de returns
  const contentObj = useMemo(() => normalizeContent(block?.content), [block]);
  const sections = useMemo(() => contentObj.sections || [], [contentObj]);

  /* ---------- renders ---------- */
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

  if (!block) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">No se encontró el learning block.</Alert>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          ← Volver
        </Button>
        <div className="text-muted">ID: {block.id}</div>
      </div>

      <Card className="p-4 shadow-sm">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <h2 className="mb-0">{block.title}</h2>
          <Badge bg="dark">{block.subject}</Badge>
          <Badge bg="secondary">Nivel {block.level}</Badge>
          <Badge bg="info">{block.estimated_minutes} min</Badge>
        </div>

        <p className="text-muted mt-2 mb-3">{block.summary}</p>

        <hr />

        <h5 className="mb-3">Contenido</h5>

        {sections.length === 0 ? (
          <p className="text-muted">Este learning block no tiene secciones.</p>
        ) : (
          sections.map((section, idx) => <RenderSection key={idx} section={section} />)
        )}
      </Card>
    </Container>
  );
}