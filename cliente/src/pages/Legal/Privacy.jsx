// src/pages/Privacy.jsx
import React from "react";

export default function Privacy() {
return (
    <main className="page">
    <section className="section section--accent">
        <div className="container">
        <h1 className="section-title">Política de Privacidad</h1>
        <p className="section-subtitle">
            Última actualización: {new Date().toLocaleDateString()}
        </p>

        <div className="card account-card">
            <h2>1. Qué información recopilamos</h2>
            <ul>
            <li>Datos de cuenta (por ejemplo: nombre, correo, ID de usuario).</li>
            <li>Datos de uso (páginas visitadas, acciones dentro de la plataforma).</li>
            <li>Datos técnicos (dispositivo, navegador, logs básicos).</li>
            </ul>

            <h2>2. Para qué la usamos</h2>
            <ul>
            <li>Autenticación, seguridad y operación del servicio.</li>
            <li>Mejorar la experiencia y el contenido.</li>
            <li>Diagnóstico de errores y analítica mínima.</li>
            </ul>

            <h2>3. Cookies / almacenamiento local</h2>
            <p>
            Podemos usar cookies o almacenamiento local para mantener sesión,
            preferencias y funcionamiento del producto.
            </p>

            <h2>4. Compartición de datos</h2>
            <p>
            No vendemos datos. Solo se comparten cuando es necesario para operar el servicio
            o por obligación legal.
            </p>

            <h2>5. Retención</h2>
            <p>
            Conservamos datos el tiempo necesario para operar el servicio y cumplir obligaciones.
            </p>

            <h2>6. Tus derechos</h2>
            <ul>
            <li>Acceder, corregir o eliminar información.</li>
            <li>Solicitar exportación (si aplica).</li>
            </ul>

            <h2>7. Contacto</h2>
            <p>Si tienes dudas, usa la página de Contacto.</p>
        </div>
        </div>
    </section>
    </main>
);
}