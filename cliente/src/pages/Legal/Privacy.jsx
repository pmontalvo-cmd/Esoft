import React from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
return (
    <div className="page-shell">
    {/* HERO BAND (como Home) */}
    <section className="hero-band">
        <div className="container">
        <h1 className="page-title">Política de Privacidad</h1>
        <p className="page-subtitle">
            Última actualización: {new Date().toLocaleDateString()} • Transparencia y control del usuario
        </p>

        <div className="legal-meta">
            <span className="tag tag--blue">Datos mínimos</span>
            <span className="tag tag--yellow">Seguridad</span>
            <span className="tag tag--red">No venta de datos</span>
            <Link className="btn btn-outline btn-sm" to="/Contact">
            Contacto
            </Link>
        </div>
        </div>
    </section>

    {/* RESUMEN VISUAL */}
    <section className="section section-band--warm">
        <div className="container">
        <div className="legal-grid">
            <div className="card card--tint-blue legal-card">
            <h3>Qué recopilamos</h3>
            <p className="section-subtitle">
                Solo lo necesario para operar la plataforma, mejorar contenido y mantener seguridad.
            </p>
            <ul className="legal-list">
                <li>Cuenta: nombre/correo/ID</li>
                <li>Uso: páginas y acciones</li>
                <li>Técnico: navegador/logs</li>
            </ul>
            </div>

            <div className="card card--tint-yellow legal-card">
            <h3>Cómo lo usamos</h3>
            <p className="section-subtitle">Enfocado en aprendizaje y estabilidad del servicio.</p>
            <ul className="legal-list">
                <li>Autenticación y seguridad</li>
                <li>Recomendaciones y progreso</li>
                <li>Diagnóstico de errores</li>
            </ul>
            </div>

            <div className="card card--tint-red legal-card">
            <h3>Tus derechos</h3>
            <p className="section-subtitle">Control y acceso sobre tu información.</p>
            <ul className="legal-list">
                <li>Acceder/corregir/eliminar</li>
                <li>Solicitar exportación (si aplica)</li>
                <li>Contactar soporte</li>
            </ul>
            </div>
        </div>

        {/* TEXTO DETALLADO */}
        <div className="card account-card legal-body">
            <h2>1. Información que recopilamos</h2>
            <p>
            Recopilamos información para permitir el funcionamiento del servicio, proteger cuentas,
            y mejorar la experiencia de aprendizaje. Esto puede incluir:
            </p>
            <ul className="legal-list">
            <li><b>Datos de cuenta</b>: nombre, correo, identificadores internos.</li>
            <li><b>Datos de uso</b>: interacción con bloques, navegación, búsquedas (si aplica).</li>
            <li><b>Datos técnicos</b>: tipo de dispositivo, navegador y registros básicos del sistema.</li>
            </ul>

            <h2>2. Finalidades</h2>
            <ul className="legal-list">
            <li><b>Operación</b>: sesiones, autenticación, funciones principales.</li>
            <li><b>Calidad</b>: mejora de recomendaciones, contenido y usabilidad.</li>
            <li><b>Seguridad</b>: prevención de abuso, monitoreo de errores y eventos críticos.</li>
            </ul>

            <h2>3. Cookies y almacenamiento local</h2>
            <p>
            Podemos usar cookies o almacenamiento local para mantener sesión, recordar preferencias
            y permitir continuidad del uso (por ejemplo, idioma, usuario activo, etc.).
            </p>

            <h2>4. Compartición de datos</h2>
            <p>
            <b>No vendemos tus datos.</b> Podemos compartir información únicamente:
            </p>
            <ul className="legal-list">
            <li>Con proveedores técnicos necesarios para operar (hosting, monitoreo, etc.).</li>
            <li>Si una ley o autoridad competente lo exige.</li>
            <li>Para proteger la integridad del sistema y usuarios ante abuso o fraude.</li>
            </ul>

            <h2>5. Retención</h2>
            <p>
            Conservamos datos el tiempo razonablemente necesario para operar el servicio, cumplir obligaciones
            y resolver incidencias. Cuando sea posible, se eliminan o anonimizan.
            </p>

            <h2>6. Tus derechos</h2>
            <p>
            Puedes solicitar acceso, corrección o eliminación de tu información (según aplique).
            Para solicitudes, usa la página de <Link to="/Contact">Contacto</Link>.
            </p>

            <h2>7. Cambios</h2>
            <p>
            Esta política puede actualizarse. La versión vigente es la publicada en esta página.
            </p>
        </div>
        </div>
    </section>
    </div>
);
}