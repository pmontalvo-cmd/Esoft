import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css";
export default function Home(){
return (
    <div className="section">
    <div className="container">
        <div className="hero">
        <div>
            <h1>Knowledge Adapted for You</h1>
            <p>
            Plataforma educativa con rutas y bloques recomendados según tu nivel,
            con enfoque claro, rápido y práctico.
            </p>

            <div style={{display:"flex", gap:"12px", flexWrap:"wrap"}}>
            <Link to="/quizIn" className="btn btn-primary">Empezar diagnóstico</Link>
            <Link to="/dashboard" className="btn btn-outline">Ver dashboard</Link>
            </div>
        </div>

        <div className="hero-media">
            {/* Pon aquí tu imagen actual o una ilustración propia */}
            <img
            src="https://i.postimg.cc/wMS5RKJX/Captura-de-pantalla-2025-03-05-111057.png"
            alt="EcuMentis"
            />
        </div>
        </div>

        <div className="feature-grid">
        <div className="card feature">
            <h3>Personalización</h3>
            <p>Recomendaciones por nivel y materia para avanzar sin perder tiempo.</p>
        </div>
        <div className="card feature">
            <h3>Seguimiento</h3>
            <p>Progreso visible y claro: qué dominas y qué necesitas reforzar.</p>
        </div>
        <div className="card feature">
            <h3>Bloques cortos</h3>
            <p>Aprendizaje en piezas pequeñas, directo al grano (estilo plataforma).</p>
        </div>
        </div>
    </div>
    </div>
);
}