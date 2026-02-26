import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const quickRoutes = [
{ label: "Matemáticas • Nivel 2", note: "Aritmética → interés", tone: "tone-blue" },
{ label: "Ciencias • Nivel 3", note: "Fuerza y movimiento", tone: "tone-yellow" },
{ label: "Lenguaje • Nivel 2", note: "Lectura crítica", tone: "tone-red" },
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

const popular = [
{ t: "Interés compuesto", m: "Finanzas", n: "Nivel 2 • 12 min" },
{ t: "Leyes de Newton", m: "Ciencias", n: "Nivel 3 • 20 min" },
{ t: "Ecuaciones lineales", m: "Matemáticas", n: "Nivel 2 • 15 min" },
{ t: "Revolución Francesa", m: "Sociales", n: "Nivel 3 • 18 min" },
];

export default function Home() {
return (
<div className="home">

{/* HERO */}
<div className="section section--tint-blue section--accent">
<section className="home-hero">
    <div className="container">
    <div className="home-hero__grid">
        <div>
        <h1>Conocimiento educativo, claro y organizado.</h1>
        <div className="home-search card">
            <input
            className="home-search__input"
            placeholder="Buscar temas: interés compuesto, Newton, fotosíntesis..."
            />
            <Link to="/dashboard" className="btn btn-primary">Buscar</Link>
        </div>

        <div className="home-cta">
            <Link to="/quizIn" className="btn btn-primary">Empezar diagnóstico</Link>
            <Link to="/dashboard" className="btn btn-outline">Ver dashboard</Link>
        </div>
        </div>

        <div className="home-quick card">
        <div className="home-quick__head">
            <h3>Accesos rápidos</h3>
            <span>Contenido de prueba</span>
        </div>

        <div className="home-quick__list">
            {quickRoutes.map((x) => (
            <div key={x.label} className={`home-quick__item ${x.tone}`}>
                <div>
                <div className="home-quick__title">{x.label}</div>
                <div className="home-quick__note">{x.note}</div>
                </div>
                <button className="btn btn-outline btn-sm">Abrir</button>
            </div>
            ))}
        </div>
        </div>
    </div>

    {/* STATS */}
    <div className="home-stats">
        <div className="card home-stat"><div className="home-stat__big">7</div><div className="home-stat__small">materias</div></div>
        <div className="card home-stat"><div className="home-stat__big">100+</div><div className="home-stat__small">temas base</div></div>
        <div className="card home-stat"><div className="home-stat__big">3–25</div><div className="home-stat__small">min por bloque</div></div>
        <div className="card home-stat"><div className="home-stat__big">Nivel 1–4</div><div className="home-stat__small">progresión</div></div>
    </div>
    </div>
</section>
</div>


    {/* CATALOGO */}
<div className="section section--tint-yellow">
    <div className="container">
    <div className="home-sectionHead">
            <div>
            <h2>Explorar bloques por area</h2>
            </div>
            <div className="home-sectionHead__actions">
            <button className="btn btn-outline">Ver todo</button>
            <button className="btn btn-primary">Recomendado</button>
            </div>
        </div>

    <div className="home-twoCol">
    <div className="card home-levels">
        <h3>Explorar por área</h3>

        <div className="home-quick__list" style={{ marginTop: 10 }}>
        {[
            { label: "Finanzas", note: "Bloques organizados", tone: "tone-blue" },
            { label: "Matemáticas", note: "Bloques organizados", tone: "tone-yellow" },
            { label: "Lenguaje", note: "Bloques organizados", tone: "tone-red" },
            { label: "Lógica", note: "Bloques organizados", tone: "tone-blue" },
            { label: "Ciencias", note: "Bloques organizados", tone: "tone-yellow" },
            { label: "Tecnología", note: "Bloques organizados", tone: "tone-blue" },
            { label: "Estudios Sociales", note: "Bloques organizados", tone: "tone-red" },
        ].map((x) => (
            <div key={x.label} className={`home-quick__item ${x.tone}`}>
            <div>
                <div className="home-quick__title">{x.label}</div>
                <div className="home-quick__note">{x.note}</div>
            </div>
            <button className="btn btn-outline btn-sm">Abrir</button>
            </div>
        ))}
        </div>
    </div>

    <div className="card home-levels">
        <h3>Explorar por nivel</h3>

        <div className="home-quick__list" style={{ marginTop: 10 }}>
        {[
            { label: "Nivel 1", note: "Bases", tone: "tone-blue" },
            { label: "Nivel 2", note: "Intermedio", tone: "tone-yellow" },
            { label: "Nivel 3", note: "Aplicación", tone: "tone-red" },
            { label: "Nivel 4", note: "Profundización", tone: "tone-blue" },
        ].map((x) => (
            <div key={x.label} className={`home-quick__item ${x.tone}`}>
            <div>
                <div className="home-quick__title">{x.label}</div>
                <div className="home-quick__note">{x.note}</div>
            </div>
            <button className="btn btn-outline btn-sm">Abrir</button>
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
    <h2>Porque EcuMentis</h2>
    <p className="home-muted">Una enciclopedia gratuita para entender temas en minutos.</p>

    <div className="card home-list" style={{ marginTop: 14 }}>
    <p>
        EcuMentis organiza el conocimiento en <strong>bloques cortos</strong>, claros y ordenados por
        <strong> área</strong> y <strong>nivel</strong>. Puedes explorar libremente o usar el
        <strong> diagnóstico</strong> para recibir recomendaciones según tu base y avanzar con una progresión definida.
    </p>
    </div>
</div>
</section>

    {/* CTA FINAL */}
    <section className="section section--tint-blue">
        <div className="container">
        <div className="card home-final">
            <div>
            <h2>Empieza Según tu Objetivo</h2>
            <p>Diagnóstico → dashboard → bloques sugeridos. O explora cualquier tema como consulta.</p>
            </div>
            <div className="home-final__actions">
            <button className="btn btn-outline">Explorar catálogo</button>
            <Link to="/quizIn" className="btn btn-primary">Empezar diagnóstico</Link>
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
        <p className="footer-muted">
        Plataforma educativa para consulta rápida estilo enciclopedia + rutas recomendadas por diagnóstico.
        </p>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        </div>
    </div>

    <div>
        <div className="footer-title">Producto</div>
        <div className="footer-links">
        <Link to="/home">Inicio</Link>
        <Link to="/quizIn">Diagnóstico</Link>
        <Link to="/dashboard">Inicio</Link>
        </div>
    </div>

    <div>
        <div className="footer-title">Recursos</div>
        <div className="footer-links">
        <Link to="#">Catálogo de temas</Link>
        <Link to="#">Metodología</Link>
        <Link to="#">Soporte</Link>
        </div>
    </div>

    <div>
        <div className="footer-title">Legal</div>
        <div className="footer-links">
        <Link to="#">Privacidad</Link>
        <Link to="#">Términos</Link>
        <Link to="#">Contacto</Link>
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