import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { t, subjectLabel } from "../../i18n";

const quickRoutes = [
{ label: t("subject_math") + " "    + t("level") + ": 2", tone: "tone-blue", query: "math + level:2"},
{ label: t("subject_science") + " " + t("level") +": 3", tone: "tone-yellow", query: "science + level:3" },
{ label: t("subject_language") + " "+ t("level") +": 2", tone: "tone-red", query: "language + level:2" },
];

const subjects = [
{ title: "Matemáticas", desc: "Aritmética, álgebra, funciones, interés.", tag: "Precisión", tone: "tone-blue" },
{ title: "Ciencias", desc: "Física, biología, química básica.", tag: "Experimento", tone: "tone-yellow" },
{ title: "Lenguaje", desc: "Lectura crítica, redacción, vocabulario.", tag: "Comprensión", tone: "tone-red" },
{ title: "Sociales", desc: "Historia, ciudadanía, geografía.", tag: "Contexto", tone: "tone-blue" },
{ title: "Tecnología", desc: "Lógica, conceptos digitales, herramientas.", tag: "Habilidad", tone: "tone-yellow" },
{ title: "Finanzas", desc: "Ahorro, interés, decisiones financieras.", tag: "Vida real", tone: "tone-red" },
{ title: "Logica", desc: "Ahorro, interés, decisiones financieras.", tag: "Vida real", tone: "tone-blue" },
];


export default function Home() {
const navigate = useNavigate();

let [query, setQuery] = useState("");
return (
<div className="home">

{/* HERO */}
<div className="section section--tint-blue">
<section className="home-hero  section--photo"  style={{ "--section-photo": "url(/images/home/hero.jpg)" }}>
    <div className="container">
    <div className="home-hero__grid">
        <div>
        <h1>{t("home_hero_title")}</h1>
        <div className="home-search card">
            <input
            type="text"
            className="home-search__input"
            placeholder="Buscar temas: interés compuesto, Newton, fotosíntesis..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <Link to={`/dashboard?q=${encodeURIComponent(query)}`} className="btn btn-primary">{t("home_btn_search")}</Link>
        </div>

        <div className="home-cta">
            <Link to="/quizIn" className="btn btn-primary">{t("home_btn_startQuiz")}</Link>
            <Link to="/dashboard" className="btn btn-outline">{t("home_toDashboard")}</Link>
        </div>
        </div>

        <div className="home-quick card">
        <div className="home-quick__head">
            <h3>{t("home_quickAcces_title")}</h3>
        </div>

        <div className="home-quick__list">
            {quickRoutes.map((x) => (
            <div key={x.label} className={`home-quick__item ${x.tone}`}>
                <div>
                <div className="home-quick__title">{x.label}</div>
                </div>
                <button onClick={() => navigate(`/dashboard?q=${x.query}`)} className="btn btn-outline btn-sm">{t("home_btn_open")}</button>
            </div>
            ))}
        </div>
        </div>
    </div>

    {/* STATS */}
    <div className="home-stats">
        <div className="card home-stat"><div className="home-stat__big">7</div><div className="home-stat__small">{t("home_stats_subjects")}</div></div>
        <div className="card home-stat"><div className="home-stat__big">100+</div><div className="home-stat__small">{t("home_stats_baseSubjects")}</div></div>
        <div className="card home-stat"><div className="home-stat__big">3–60</div><div className="home-stat__small">{t("home_stats_minPBloks")}</div></div>
        <div className="card home-stat"><div className="home-stat__big">Nivel 1–4</div><div className="home-stat__small">{t("home_stats_progresion")}</div></div>
    </div>
    </div>
</section>
</div>


    {/* CATALOGO */}
<div className="section section--tint-yellow">
    <div className="container">
    <div className="home-sectionHead">
            <div>
            <h2>{t("home_catalog_title")}</h2>
            </div>
            <div className="home-sectionHead__actions">
            <Link to="/dashboard?mode=all" className="btn btn-outline">{t("btn_view_all")}</Link>
            <Link to="/dashboard?mode=recommended" className="btn btn-primary">{t("btn_recommended")}</Link>
            </div>
        </div>

    <div className="home-twoCol">
    <div className="card home-levels">
        <h3>{t("home_catalog_subTitle1")}</h3>

        <div className="home-quick__list" style={{ marginTop: 10 }}>
        {[
            { label: t("subject_finance"),  tone: "tone-blue",  query: "Finance" },
            { label: t("subject_math"),     tone: "tone-yellow",query: "Math" },
            { label: t("subject_language"), tone: "tone-red",   query: "Language"},
            { label: t("subject_logic"),    tone: "tone-blue",  query: "Logic"},
            { label: t("subject_science"),  tone: "tone-yellow",query: "Science" },
            { label: t("subject_tech"),     tone: "tone-blue",  query: "Tech"},
            { label: t("subject_social"),   tone: "tone-red",   query: "Social" },
        ].map((x) => (
            <div key={x.label} className={`home-quick__item ${x.tone}`}>
            <div>
                <div className="home-quick__title">{x.label}</div>
            </div>
            <button onClick={() => navigate(`/dashboard?q=${x.query}`)} className="btn btn-outline btn-sm">{t("btn_open")}</button>
            </div>
        ))}
        </div>
    </div>

    <div className="card home-levels">
        <h3>{t("home_catalog_subTitle2")}</h3>

        <div className="home-quick__list" style={{ marginTop: 10 }}>
        {[
            { label: "Nivel 1", note: "Bases", tone: "tone-blue", query: "Level: 1" },
            { label: "Nivel 2", note: "Intermedio", tone: "tone-yellow", query: "Level: 2" },
            { label: "Nivel 3", note: "Aplicación", tone: "tone-red", query: "Level: 3"},
            { label: "Nivel 4", note: "Profundización", tone: "tone-blue", query: "Level: 4" },
        ].map((x) => (
            <div key={x.label} className={`home-quick__item ${x.tone}`}>
            <div>
                <div className="home-quick__title">{x.label}</div>
                <div className="home-quick__note">{x.note}</div>
            </div>
            <button onClick={() => navigate(`/dashboard?q=${x.query}`)} className="btn btn-outline btn-sm">{t("btn_open")}</button>
            </div>
        ))}
        </div>
    </div>
    </div>

    </div>
</div>

    {/* Porque Nosotros */}
<section className="section section--tint-red">
<div className="container">
    <h2>How it Works</h2>
    <p className="home-muted">
    Usa EcuMentis de dos formas: explorar libremente o desbloquear una ruta recomendada.
    </p>

    <div className="home-howItWorks">
    <div className="card home-howCard tone-blue">
        <div className="home-howCard__step">1</div>
        <h3>Explore freely</h3>
        <p>
        Usa la búsqueda o entra al catálogo para abrir bloques por tema o nivel.
        No necesitas cuenta para consultar contenido.
        </p>
    </div>

    <div className="card home-howCard tone-yellow">
        <div className="home-howCard__step">2</div>
        <h3>Create your route</h3>
        <p>
        Regístrate, inicia sesión y toma el quiz diagnóstico para definir tu nivel
        por materia.
        </p>
    </div>

    <div className="card home-howCard tone-red">
        <div className="home-howCard__step">3</div>
        <h3>Get recommendations</h3>
        <p>
        Ve al Dashboard para ver bloques recomendados según tu base,
        o consulta todos los bloques si solo quieres explorar.
        </p>
    </div>
    </div>

    <div className="card home-list home-howSummary">
    <div className="home-list__item">
        <div>
        <div className="home-list__title">Quick path</div>
        <div className="home-list__meta">Search or Dashboard → open blocks immediately</div>
        </div>
        <Link to="/dashboard?mode=all" className="btn btn-outline btn-sm">
        Explore
        </Link>
    </div>

    <div className="home-list__item">
        <div>
        <div className="home-list__title">Personalized path</div>
        <div className="home-list__meta">Register → Login → Diagnostic Quiz → Dashboard</div>
        </div>
        <Link to="/quizIn" className="btn btn-primary btn-sm">
        Start
        </Link>
    </div>
    </div>
</div>
</section>

    {/* CTA FINAL */}
    <section className="section section--tint-blue">
        <div className="container">
        <div className="card home-final">
            <div>
            <h2>{t("home_btn_startQuiz")}</h2>
            <p>{t("home_cta_subTitle")}</p>
            </div>
            <div className="home-final__actions">
            <Link to="/dashboard?mode=all" className="btn btn-outline">{t("home_cta_exploreCatalog")}</Link>
            <Link to="/quizIn" className="btn btn-primary">{t("home_btn_startQuiz")}</Link>
            </div>
        </div>
        </div>
    </section>

{/* FOOTER */}
<footer className="site-footer">
<div className="container">
    <div className="footer-grid">
    <div>
        <div className="footer-title">ECUMENTIS</div>
        <p className="footer-muted">{t("home_footer_subTitle")}</p>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        </div>
    </div>

    <div>
        <div className="footer-title">Producto</div>
        <div className="footer-links">
        <Link to="/home">{t("nav_home")}</Link>
        <Link to="/quizIn">{t("nav_quiz")}</Link>
        <Link to="/dashboard">{t("nav_dashboard")}</Link>
        </div>
    </div>

    <div>
        <div className="footer-title">Recursos</div>
        <div className="footer-links">
        <Link to="/dashboard?mode=all">{t("home_subject_catalog")}</Link>
        <Link to="/Contact">Soporte</Link>
        </div>
    </div>

    <div>
        <div className="footer-title">Legal</div>
        <div className="footer-links">
        <Link to="/Privacy">Privacidad</Link>
        <Link to="/Terms">Términos</Link>
        <Link to="/Contact">Contacto</Link>
        </div>
    </div>
    </div>

    <div className="footer-bottom">
    <div>© {new Date().getFullYear()} Ecumentis. All rights reserved.</div>
    </div>
</div>
</footer>
</div>
);
}