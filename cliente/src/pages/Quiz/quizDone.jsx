import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { t } from "../../i18n";

export default function QuizDone() {
const navigate = useNavigate();

return (
    <div className="page-shell">
    <div className="hero-band hero-band--full">
        <Container>
        <Card className="panel p-4 card--tint-blue">
            <h1 className="page-title">{t("quiz_done_title")}</h1>
            <p className="page-subtitle">{t("quiz_done_subtitle")}</p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            <Button onClick={() => navigate("/dashboard")}>
                {t("quiz_done_cta")}
            </Button>

            <Button variant="outline-primary" onClick={() => navigate("/dashboard?mode=all")}>
                {t("quiz_done_catalog")}
            </Button>
            </div>
        </Card>
        </Container>
    </div>
    </div>
);
}