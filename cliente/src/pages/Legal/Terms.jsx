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
            Al acceder o utilizar EcuMentis (el “Servicio”), aceptas estos Términos y Condiciones.
            Si no estás de acuerdo con alguno de sus puntos, no uses el Servicio.
            </p>

            <h2>2. Definiciones</h2>
            <ul className="legal-list">
            <li>
                <b>“Servicio”</b>: la web/app, sus interfaces, funcionalidades, APIs internas (si existieran),
                documentación, diseño, y componentes asociados.
            </li>
            <li>
                <b>“Contenido”</b>: textos, bloques de aprendizaje, ejercicios, estructura curricular, UI/UX,
                marca, logotipos, estilo visual, compilaciones y materiales.
            </li>
            <li>
                <b>“Usuario”</b>: cualquier persona que navega, se registra o utiliza el Servicio.
            </li>
            <li>
                <b>“Uso No Comercial”</b>: uso personal, educativo o institucional sin fines de lucro directo,
                sin monetización, sin venta, y sin explotación económica del Servicio o Contenido.
            </li>
            <li>
                <b>“Uso Comercial”</b>: cualquier uso que genere (o busque generar) ingresos directos o indirectos,
                incluyendo suscripción, anuncios pagados, venta de cursos, afiliados, licenciamiento, consultoría,
                o uso dentro de una oferta comercial.
            </li>
            </ul>

            <h2>3. Naturaleza de la licencia (híbrida: “open-ish” + proprietary)</h2>
            <p>
            EcuMentis se ofrece gratuitamente para <b>Uso No Comercial</b>. El enfoque es “abierto para aprender”
            (acceso y uso amplio educativo) pero el Servicio y su Contenido permanecen como <b>propiedad del proyecto</b>.
            Esto significa: puedes usarlo libremente para aprender o enseñar sin ánimo de lucro, pero no puedes
            convertirlo en un producto comercial ni revenderlo.
            </p>

            <h2>4. Concesión de licencia no comercial</h2>
            <p>
            Sujeto a estos términos, se te concede una licencia limitada, revocable, no exclusiva y no transferible para:
            </p>
            <ul className="legal-list">
            <li>Acceder al Servicio y usarlo con fines personales o educativos.</li>
            <li>Compartir enlaces al Servicio de manera razonable.</li>
            <li>Usar el Contenido como apoyo de estudio dentro del Servicio.</li>
            <li>Utilizar el Servicio en instituciones educativas <b>sin cobro por acceso</b> y sin monetización.</li>
            </ul>

            <h2>5. Prohibición de uso comercial</h2>
            <p>
            Queda estrictamente prohibido, salvo autorización expresa y por escrito, usar el Servicio o el Contenido
            para fines comerciales. Esto incluye, sin limitarse a:
            </p>
            <ul className="legal-list">
            <li>Vender acceso al Servicio o a partes del Contenido.</li>
            <li>Incorporar el Contenido en cursos pagados, suscripciones o membresías.</li>
            <li>Monetizar por anuncios, paywalls, afiliados o donaciones condicionadas al acceso.</li>
            <li>Ofrecer el Servicio como parte de un producto, consultoría o servicio de pago.</li>
            <li>Distribuir una versión “white-label” o clon para terceros.</li>
            <li>Usar EcuMentis como ventaja comercial directa (ej. empaquetarlo para venderlo a clientes).</li>
            </ul>

            <h2>6. Copias, redistribución y extracción masiva</h2>
            <p>
            Para proteger la integridad del proyecto y evitar apropiación del catálogo, se aplican restricciones:
            </p>
            <ul className="legal-list">
            <li>No puedes copiar y republicar masivamente bloques o material como si fueran propios.</li>
            <li>No puedes extraer el contenido para distribuirlo como dataset, “curso completo”, PDF masivo, o repositorio público sin permiso.</li>
            <li>No puedes realizar scraping abusivo, automatizado o a gran escala para replicar el Servicio.</li>
            <li>Compartir fragmentos con fines educativos debe ser razonable, no sistemático, y sin monetización.</li>
            </ul>

            <h2>7. Atribución</h2>
            <p>
            Cuando el uso incluya referencias públicas (presentaciones, demos académicas, trabajos),
            debes incluir atribución razonable (ej. “Fuente: EcuMentis”).
            </p>

            <h2>8. Propiedad intelectual</h2>
            <p>
            El Servicio, su marca, identidad visual, estructura, compilación y contenidos originales están protegidos.
            Estos términos no transfieren propiedad; solo conceden permisos limitados de uso.
            </p>

            <h2>9. Conducta del usuario</h2>
            <ul className="legal-list">
            <li>No intentes vulnerar autenticación, seguridad, disponibilidad o integridad del sistema.</li>
            <li>No introduzcas malware, scripts maliciosos, o contenido destinado a dañar a otros usuarios.</li>
            <li>No uses el Servicio para actividades ilegales, fraudulentas o que infrinjan derechos de terceros.</li>
            <li>No suplantes identidades ni uses datos ajenos sin autorización.</li>
            </ul>

            <h2>10. Cuentas, sesión y seguridad</h2>
            <p>
            Eres responsable de mantener la confidencialidad de tus credenciales y del uso que ocurra bajo tu cuenta.
            Debes notificar cualquier acceso no autorizado tan pronto como sea posible.
            </p>

            <h2>11. Contenido educativo y exactitud</h2>
            <p>
            El Servicio ofrece material educativo. Aunque se busca calidad, puede contener errores o simplificaciones.
            El Contenido no constituye asesoría profesional, ni garantiza resultados específicos.
            </p>

            <h2>12. Disponibilidad, cambios y mantenimiento</h2>
            <p>
            Podemos actualizar, modificar o interrumpir partes del Servicio por mantenimiento o evolución del producto.
            No garantizamos disponibilidad continua ni compatibilidad perpetua con navegadores o dispositivos.
            </p>

            <h2>13. Integraciones, enlaces externos y terceros</h2>
            <p>
            El Servicio puede mostrar enlaces o recursos externos (por ejemplo, videos o fuentes).
            No controlamos esos contenidos, y no asumimos responsabilidad por su disponibilidad o exactitud.
            </p>

            <h2>14. Privacidad</h2>
            <p>
            El tratamiento de datos se describe en la{" "}
            <Link to="/Privacy">Política de Privacidad</Link>. Al usar el Servicio, aceptas también esa política.
            </p>

            <h2>15. Exención de garantías</h2>
            <p>
            El Servicio se ofrece “tal cual” y “según disponibilidad”. En la máxima medida permitida por ley,
            no ofrecemos garantías expresas o implícitas sobre funcionamiento ininterrumpido, ausencia de errores,
            adecuación a un propósito particular o resultados académicos.
            </p>

            <h2>16. Limitación de responsabilidad</h2>
            <p>
            En la medida permitida por la ley aplicable, no seremos responsables por daños indirectos, incidentales,
            especiales, pérdida de datos, lucro cesante o perjuicios derivados del uso o imposibilidad de uso del Servicio.
            </p>

            <h2>17. Indemnización</h2>
            <p>
            Aceptas indemnizar y mantener indemne al proyecto frente a reclamos, daños, responsabilidades y gastos
            derivados de: (i) tu uso indebido del Servicio, (ii) violación de estos términos, o (iii) infracción de derechos de terceros.
            </p>

            <h2>18. Suspensión y terminación</h2>
            <p>
            Podemos suspender o terminar tu acceso si detectamos abuso, scraping, uso comercial no autorizado,
            ataques, fraude o incumplimiento de estos términos. La licencia se revoca automáticamente ante incumplimiento.
            </p>

            <h2>19. Uso institucional (no comercial)</h2>
            <p>
            Instituciones educativas pueden usar el Servicio para fines académicos sin cobro por acceso al Servicio.
            Si existe cobro por un programa educativo, el acceso a EcuMentis no debe ser el “producto” vendido
            ni formar parte del valor comercial sin autorización escrita.
            </p>

            <h2>20. Solicitud de licencia comercial</h2>
            <p>
            Si necesitas usar EcuMentis con fines comerciales (empresas, cursos pagados, integraciones, licencias,
            servicios a clientes), debes solicitar autorización. Usa{" "}
            <Link to="/Contact">Contacto</Link>.
            </p>

            <h2>21. Cambios a estos términos</h2>
            <p>
            Podemos actualizar estos términos. La versión vigente es la publicada aquí. Si continúas usando el Servicio
            después de cambios, se entiende que aceptas la versión actualizada.
            </p>

            <h2>22. Separabilidad</h2>
            <p>
            Si alguna disposición se considera inválida o inaplicable, el resto de los términos seguirá vigente
            en la máxima medida permitida.
            </p>

            <h2>23. No renuncia</h2>
            <p>
            La falta de aplicación de alguna cláusula no constituye renuncia a nuestro derecho de exigirla posteriormente.
            </p>

            <h2>24. Ley aplicable y jurisdicción</h2>
            <p>
            Estos términos se interpretan conforme a la ley aplicable del lugar donde opere el proyecto, salvo que una norma
            de protección al consumidor disponga lo contrario. Cualquier disputa se intentará resolver primero de buena fe.
            </p>

            <h2>25. Contacto</h2>
            <p>
            Para dudas, reportes o solicitudes de licencia:{" "}
            <Link to="/Contact">Página de Contacto</Link>.
            </p>

            <p className="section-subtitle" style={{ marginTop: 16 }}>
            Nota: Este texto está diseñado para un MVP/demo. Si lo usarás en producción, conviene revisión legal profesional.
            </p>
        </div>
        </div>
    </section>
    </div>
);
}