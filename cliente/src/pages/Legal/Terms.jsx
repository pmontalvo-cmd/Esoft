// cliente/src/pages/Legal/Terms.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
return (
    <div className="page-shell">
    <section className="hero-band">
        <div className="container">
        <h1 className="page-title">Términos y Condiciones</h1>
        <p className="page-subtitle">
            Última actualización: {new Date().toLocaleDateString()} • Licencia de uso no comercial
        </p>

        <div className="legal-meta">
            <span className="tag tag--blue">Uso educativo</span>
            <span className="tag tag--yellow">Gratis</span>
            <span className="tag tag--red">No comercial</span>
            <Link className="btn btn-outline btn-sm" to="/Privacy">
            Privacidad
            </Link>
        </div>
        </div>
    </section>

    <section className="section">
        <div className="container">
        <div className="card account-card legal-body">
            <h2>1. Aceptación</h2>
            <p>
            Al acceder o utilizar EcuMentis (el “Servicio”), aceptas estos términos.
            Si no estás de acuerdo, no uses el Servicio.
            </p>

            <h2>2. Definiciones</h2>
            <ul className="legal-list">
            <li><b>“Servicio”</b>: la web/app, contenidos, interfaz, y componentes asociados.</li>
            <li><b>“Contenido”</b>: textos, bloques, ejercicios, estructura, diseño, marca y materiales.</li>
            <li><b>“Uso no comercial”</b>: uso personal, académico o institucional sin fines de lucro directo.</li>
            <li><b>“Uso comercial”</b>: cualquier uso que genere ingresos directos o indirectos, monetización, venta, publicidad pagada, licenciamiento o explotación económica.</li>
            </ul>

            <h2>3. Naturaleza de la licencia (híbrida: “open-ish” + proprietary)</h2>
            <p>
            EcuMentis se ofrece de forma gratuita para <b>uso no comercial</b>. Sin embargo, el Servicio y su
            Contenido son <b>propiedad del proyecto</b> y se distribuyen bajo un esquema de licencia
            híbrida: permite uso amplio educativo, pero restringe explotación con fines de lucro.
            </p>

            <h2>4. Concesión de licencia no comercial</h2>
            <p>
            Sujeto a estos términos, se te concede una licencia limitada, revocable, no exclusiva y no transferible para:
            </p>
            <ul className="legal-list">
            <li>Acceder al Servicio y usarlo con fines <b>educativos</b> o <b>personales</b>.</li>
            <li>Compartir enlaces al Servicio.</li>
            <li>Usar el Contenido como apoyo de estudio, dentro del Servicio, sin redistribuirlo como producto.</li>
            </ul>

            <h2>5. Prohibición de uso comercial</h2>
            <p>
            Queda estrictamente prohibido (sin autorización escrita) usar el Servicio o Contenido para fines comerciales.
            Esto incluye, sin limitarse a:
            </p>
            <ul className="legal-list">
            <li>Vender acceso al Servicio o a partes del Contenido.</li>
            <li>Incorporar el Contenido en cursos pagados, membresías, “bundles”, o plataformas monetizadas.</li>
            <li>Monetizar mediante anuncios pagados, suscripciones, paywalls, donaciones condicionadas o afiliados.</li>
            <li>Ofrecer el Servicio como parte de un producto empresarial, consultoría o servicio de pago.</li>
            <li>Clonar o “white-label” la plataforma para terceros.</li>
            </ul>

            <h2>6. Derivados, copias y redistribución</h2>
            <p>
            Para conservar el carácter “abierto para aprender” sin perder control del producto, aplican reglas estrictas:
            </p>
            <ul className="legal-list">
            <li>No puedes copiar y republicar masivamente los bloques o estructura del catálogo como si fuera tuyo.</li>
            <li>No puedes extraer el Contenido y redistribuirlo como dataset o librería pública sin permiso.</li>
            <li>Si compartes capturas o fragmentos con fines educativos, debe ser razonable, con atribución y sin monetización.</li>
            </ul>

            <h2>7. Atribución</h2>
            <p>
            Cuando el uso incluya referencias públicas (por ejemplo, presentaciones académicas, demos, reportes),
            debes indicar una atribución razonable a EcuMentis. Ejemplo: “Fuente: EcuMentis”.
            </p>

            <h2>8. Propiedad intelectual</h2>
            <p>
            El Servicio, su marca, identidad visual, estructura de contenidos, textos originales y compilación
            están protegidos por derechos de propiedad intelectual. Estos términos no transfieren propiedad:
            solo conceden permisos limitados de uso.
            </p>

            <h2>9. Cuentas, seguridad y uso aceptable</h2>
            <ul className="legal-list">
            <li>Eres responsable de la actividad de tu cuenta.</li>
            <li>No intentes vulnerar autenticación, scraping abusivo, ataques, o ingeniería inversa dañina.</li>
            <li>No uses el Servicio para actividades ilegales o para perjudicar a terceros.</li>
            </ul>

            <h2>10. Disponibilidad del servicio</h2>
            <p>
            El Servicio puede cambiar, actualizarse o interrumpirse temporalmente por mantenimiento.
            No garantizamos disponibilidad continua ni exactitud absoluta de todos los materiales.
            </p>

            <h2>11. Contenido educativo y limitación de garantías</h2>
            <p>
            El Servicio se ofrece “tal cual”. Aunque buscamos precisión, el contenido educativo puede contener
            errores o simplificaciones. No garantizamos resultados académicos específicos.
            </p>

            <h2>12. Limitación de responsabilidad</h2>
            <p>
            En la medida permitida por ley, no seremos responsables por daños indirectos, pérdida de datos,
            lucro cesante o perjuicios derivados del uso o imposibilidad de uso del Servicio.
            </p>

            <h2>13. Terminación</h2>
            <p>
            Podemos suspender o terminar el acceso si detectamos abuso, uso comercial no autorizado,
            ataques, fraude o violaciones de estos términos. La licencia se revoca automáticamente ante incumplimiento.
            </p>

            <h2>14. Solicitud de licencia comercial</h2>
            <p>
            Si necesitas usar EcuMentis con fines comerciales (instituciones, empresas, cursos pagados,
            integraciones, licencias, etc.), debes solicitar autorización. Usa <Link to="/Contact">Contacto</Link>.
            </p>

            <h2>15. Cambios de términos</h2>
            <p>
            Podemos actualizar estos términos. La versión vigente es la publicada aquí. El uso continuado
            implica aceptación de la versión actual.
            </p>

            <h2>16. Separabilidad</h2>
            <p>
            Si alguna cláusula se considera inválida, el resto de los términos seguirá vigente.
            </p>

            <h2>17. Contacto</h2>
            <p>
            Para dudas o solicitudes de licencia: <Link to="/Contact">Página de Contacto</Link>.
            </p>

            <p className="section-subtitle" style={{ marginTop: 16 }}>
            Nota: Este texto busca claridad y formalidad para un MVP. Si lo usarás en producción,
            es recomendable revisión legal profesional.
            </p>
        </div>
        </div>
    </section>
    </div>
);
}