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
        <p>
            Consulta rápida estilo enciclopedia + diagnóstico para recomendar bloques por materia y nivel.
        </p>

        <div className="home-search card">
            <input
            className="home-search__input"
            placeholder="Buscar temas: interés compuesto, Newton, fotosíntesis..."
            />
            <button className="btn btn-primary">Buscar</button>
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
            <h2>Explorar por materia</h2>
            <p>Estructura clara para navegar rápido (consulta estilo enciclopedia).</p>
            </div>
            <div className="home-sectionHead__actions">
            <button className="btn btn-outline">Ver todo</button>
            <button className="btn btn-primary">Recomendado</button>
            </div>
        </div>

        <div className="home-subjects">
            {subjects.map((s) => (
            <div key={s.title} className="card home-subject">
                <div className={`home-subject__top ${s.tone}`}>
                <div className="home-subject__row">
                    <h3>{s.title}</h3>
                    <span className="home-pill">{s.tag}</span>
                </div>
                <p>{s.desc}</p>
                </div>

                <div className="home-subject__actions">
                <button className="btn btn-outline btn-sm">Temas</button>
                <button className="btn btn-outline btn-sm">Niveles</button>
                <button className="btn btn-primary btn-sm">Empezar</button>
                </div>
            </div>
            ))}
        </div>
    </div>
</div>

    {/* TEMAS POPULARES */}
    <section className="section section--tint-red">
        <div className="container">
        <h2>Temas populares</h2>
        <p className="home-muted">Acceso directo a contenidos buscados con frecuencia (consulta rápida).</p>

        <div className="home-twoCol">
            <div className="card home-list">
            {popular.map((x) => (
                <div key={x.t} className="home-list__item">
                <div>
                    <div className="home-list__title">{x.t}</div>
                    <div className="home-list__meta">{x.m} • {x.n}</div>
                </div>
                <button className="btn btn-outline btn-sm">Abrir</button>
                </div>
            ))}
            </div>

            <div className="card home-levels">
            <h3>Explorar por nivel</h3>
            {["Nivel 1 (Bases)", "Nivel 2 (Intermedio)", "Nivel 3 (Aplicación)", "Nivel 4 (Profundización)"].map((lvl) => (
                <button key={lvl} className="btn btn-outline home-levelBtn">{lvl}</button>
            ))}
            </div>
        </div>
        </div>
    </section>

    {/* CTA FINAL */}
    <section className="section section--tint-blue">
        <div className="container">
        <div className="card home-final">
            <div>
            <h2>¿Listo para tu ruta recomendada?</h2>
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
        <span className="chip chip--blue">Azul</span>
        <span className="chip chip--yellow">Amarillo</span>
        <span className="chip chip--red">Rojo</span>
        </div>
    </div>

    <div>
        <div className="footer-title">Producto</div>
        <div className="footer-links">
        <a href="/home">Inicio</a>
        <a href="/quizIn">Diagnóstico</a>
        <a href="/dashboard">Dashboard</a>
        </div>
    </div>

    <div>
        <div className="footer-title">Recursos</div>
        <div className="footer-links">
        <a href="#">Catálogo de temas</a>
        <a href="#">Metodología</a>
        <a href="#">Soporte</a>
        </div>
    </div>

    <div>
        <div className="footer-title">Legal</div>
        <div className="footer-links">
        <a href="#">Privacidad</a>
        <a href="#">Términos</a>
        <a href="#">Contacto</a>
        </div>
    </div>
    </div>

    <div className="footer-bottom">
    <div>© {new Date().getFullYear()} Ecumentis. All rights reserved.</div>
    <div>Hecho para consulta rápida y aprendizaje guiado.</div>
    </div>
</div>
</footer>
</div>
);
}