// src/pages/Terms.jsx
import React from "react";

export default function Terms() {
return (
    <main className="page">
    <section className="section section--accent">
        <div className="container">
        <h1 className="section-title">Términos y Condiciones</h1>
        <p className="section-subtitle">
            Última actualización: {new Date().toLocaleDateString()}
        </p>

        <div className="card account-card">
            <h2>1. Aceptación</h2>
            <p>Al usar esta plataforma, aceptas estos términos.</p>

            <h2>2. Uso permitido</h2>
            <ul>
            <li>Uso educativo y personal.</li>
            <li>No atacar, explotar o intentar romper el sistema.</li>
            <li>No usar el servicio para actividades ilegales o dañinas.</li>
            </ul>

            <h2>3. Cuentas y seguridad</h2>
            <p>Eres responsable de la seguridad de tu cuenta y su actividad.</p>

            <h2>4. Contenido</h2>
            <p>El contenido puede cambiar. No garantizamos exactitud absoluta.</p>

            <h2>5. Propiedad intelectual</h2>
            <p>No se permite copiar o redistribuir sin autorización.</p>

            <h2>6. Suspensión</h2>
            <p>Podemos suspender cuentas por abuso o violaciones de seguridad.</p>

            <h2>7. Limitación de responsabilidad</h2>
            <p>El servicio se ofrece “tal cual”.</p>

            <h2>8. Cambios</h2>
            <p>Podemos actualizar estos términos. El uso continuado implica aceptación.</p>
        </div>
        </div>
    </section>
    </main>
);
}