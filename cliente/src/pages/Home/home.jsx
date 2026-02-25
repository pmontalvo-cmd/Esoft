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

{/* ----------Testing -------------*/}
{/* ===== HERO IXL+WIKI: color suave + buscador ===== */}
<div
style={{
    background: "linear-gradient(180deg, rgba(37,99,235,0.10), rgba(245,158,11,0.06))",
    borderBottom: "1px solid var(--border)",
}}
>
<div className="container" style={{ padding: "52px 24px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 28, alignItems: "center" }}>
    <div>
        <div style={{ display: "inline-flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        <span
            style={{
            fontSize: 12,
            fontWeight: 800,
            padding: "6px 10px",
            borderRadius: 999,
            background: "rgba(37,99,235,0.12)",
            border: "1px solid rgba(37,99,235,0.18)",
            color: "var(--text)",
            }}
        >
            Consulta rápida + rutas guiadas
        </span>
        <span style={{ color: "var(--muted)", fontSize: 13 }}>EcuMentis</span>
        </div>

        <h1 style={{ margin: 0, fontSize: 44, lineHeight: 1.06 }}>
        Conocimiento educativo, claro y organizado.
        </h1>

        <p style={{ margin: "14px 0 18px", color: "var(--muted)", maxWidth: 60 + "ch" }}>
        Explora temas como una enciclopedia (consulta rápida), o usa el diagnóstico para recibir bloques recomendados
        por materia y nivel.
        </p>

        {/* Buscador estilo Wikipedia */}
        <div className="card" style={{ padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
        <input
            placeholder="Buscar temas: interés compuesto, Newton, fotosíntesis..."
            style={{
            flex: 1,
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "12px 12px",
            outline: "none",
            fontFamily: "var(--font)",
            }}
        />
        <button className="btn btn-primary" style={{ padding: "12px 16px" }}>
            Buscar
        </button>
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {["Interés compuesto", "Álgebra", "Óptica", "Revolución Francesa", "Energía"].map((t) => (
            <button
            key={t}
            className="btn btn-outline"
            style={{ padding: "8px 12px", fontWeight: 700, borderRadius: 999 }}
            >
            {t}
            </button>
        ))}
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn btn-primary">Empezar diagnóstico</button>
        <button className="btn btn-outline">Explorar catálogo</button>
        </div>
    </div>

    {/* Panel gráfico sobrio (no infantil) */}
    <div className="card" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Accesos rápidos</h3>
        <span style={{ color: "var(--muted)", fontSize: 13 }}>Contenido de prueba</span>
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {[
            { label: "Matemáticas • Nivel 2", note: "Aritmética → interés", color: "rgba(37,99,235,0.14)" },
            { label: "Ciencias • Nivel 3", note: "Fuerza y movimiento", color: "rgba(245,158,11,0.14)" },
            { label: "Lenguaje • Nivel 2", note: "Lectura crítica", color: "rgba(239,68,68,0.12)" },
        ].map((x) => (
            <div
            key={x.label}
            style={{
                padding: 12,
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: x.color,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
            }}
            >
            <div>
                <div style={{ fontWeight: 800 }}>{x.label}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{x.note}</div>
            </div>
            <button className="btn btn-outline" style={{ padding: "8px 12px" }}>
                Abrir
            </button>
            </div>
        ))}
        </div>
    </div>
    </div>

    {/* Stats tipo IXL */}
    <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
    {[
        { big: "7", small: "materias" },
        { big: "100+", small: "temas base" },
        { big: "3–25", small: "min por bloque" },
        { big: "Nivel 1–5", small: "progresión" },
    ].map((s) => (
        <div key={s.small} className="card" style={{ padding: 14 }}>
        <div style={{ fontSize: 22, fontWeight: 900 }}>{s.big}</div>
        <div style={{ color: "var(--muted)" }}>{s.small}</div>
        </div>
    ))}
    </div>
</div>
</div>

{/* ===== CATALOGO: materias con color-código ===== */}
<div className="section">
<div className="container">
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
    <div>
        <h2 style={{ margin: 0 }}>Explorar por materia</h2>
        <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>
        Estructura clara para navegar rápido (tipo enciclopedia, pero guiada por nivel).
        </p>
    </div>
    <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-outline">Ver todo</button>
        <button className="btn btn-primary">Recomendado</button>
    </div>
    </div>

    <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
    {[
        { title: "Matemáticas", desc: "Aritmética, álgebra, funciones, interés.", tag: "Precisión", bg: "rgba(37,99,235,0.10)" },
        { title: "Ciencias", desc: "Física, biología, química básica.", tag: "Experimento", bg: "rgba(245,158,11,0.10)" },
        { title: "Lenguaje", desc: "Lectura crítica, redacción, vocabulario.", tag: "Comprensión", bg: "rgba(239,68,68,0.10)" },
        { title: "Sociales", desc: "Historia, ciudadanía, geografía.", tag: "Contexto", bg: "rgba(37,99,235,0.08)" },
        { title: "Tecnología", desc: "Lógica, conceptos digitales, herramientas.", tag: "Habilidad", bg: "rgba(245,158,11,0.08)" },
        { title: "Finanzas", desc: "Ahorro, interés, decisiones financieras.", tag: "Vida real", bg: "rgba(239,68,68,0.08)" },
    ].map((s) => (
        <div key={s.title} className="card" style={{ padding: 16 }}>
        <div style={{ padding: 12, borderRadius: 14, background: s.bg, border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <h3 style={{ margin: 0 }}>{s.title}</h3>
            <span
                style={{
                fontSize: 12,
                fontWeight: 800,
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                color: "var(--muted)",
                background: "rgba(255,255,255,0.6)",
                }}
            >
                {s.tag}
            </span>
            </div>
            <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>{s.desc}</p>
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-outline">Temas</button>
            <button className="btn btn-outline">Niveles</button>
            <button className="btn btn-primary">Empezar</button>
        </div>
        </div>
    ))}
    </div>
</div>
</div>

{/* ===== SECCIÓN WIKI: Temas populares / recientes ===== */}
<div className="section">
<div className="container">
    <h2 style={{ margin: 0 }}>Temas populares</h2>
    <p style={{ margin: "8px 0 18px", color: "var(--muted)" }}>
    Acceso directo a contenidos buscados con frecuencia (consulta rápida).
    </p>

    <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 16, alignItems: "start" }}>
    <div className="card" style={{ padding: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
        {[
            { t: "Interés compuesto", m: "Finanzas", n: "Nivel 2 • 12 min" },
            { t: "Leyes de Newton", m: "Ciencias", n: "Nivel 3 • 20 min" },
            { t: "Ecuaciones lineales", m: "Matemáticas", n: "Nivel 2 • 15 min" },
            { t: "Revolución Francesa", m: "Sociales", n: "Nivel 3 • 18 min" },
        ].map((x) => (
            <div
            key={x.t}
            style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                padding: 12,
                borderRadius: 14,
                border: "1px solid var(--border)",
            }}
            >
            <div>
                <div style={{ fontWeight: 900 }}>{x.t}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                {x.m} • {x.n}
                </div>
            </div>
            <button className="btn btn-outline" style={{ padding: "8px 12px" }}>
                Abrir
            </button>
            </div>
        ))}
        </div>
    </div>

    <div className="card" style={{ padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Explorar por nivel</h3>
        <div style={{ display: "grid", gap: 10 }}>
        {["Nivel 1 (Bases)", "Nivel 2 (Intermedio)", "Nivel 3 (Aplicación)", "Nivel 4 (Profundización)", "Nivel 5 (Avanzado)"].map(
            (lvl) => (
            <button key={lvl} className="btn btn-outline" style={{ justifyContent: "flex-start" }}>
                {lvl}
            </button>
            )
        )}
        </div>
    </div>
    </div>
</div>
</div>

{/* ===== CTA FINAL ===== */}
<div className="section">
<div className="container">
    <div
    className="card"
    style={{
        padding: 22,
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        alignItems: "center",
        flexWrap: "wrap",
        background: "linear-gradient(180deg, rgba(245,158,11,0.10), rgba(37,99,235,0.08))",
    }}
    >
    <div style={{ maxWidth: 560 }}>
        <h2 style={{ margin: 0 }}>¿Listo para tu ruta recomendada?</h2>
        <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>
        Diagnóstico rápido → dashboard → bloques sugeridos. También puedes explorar cualquier tema como consulta.
        </p>
    </div>
    <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-outline">Explorar catálogo</button>
        <button className="btn btn-primary">Empezar diagnóstico</button>
    </div>
    </div>
</div>
</div>



{/* ====== SECCIÓN 1: STATS STRIP ====== */}
<div className="section">
<div className="container">
    <div className="card" style={{ padding: 18 }}>
    <div
        style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14,
        alignItems: "center",
        }}
    >
        <div>
        <div style={{ fontSize: 26, fontWeight: 800 }}>7</div>
        <div style={{ color: "var(--muted)" }}>Materias</div>
        </div>

        <div>
        <div style={{ fontSize: 26, fontWeight: 800 }}>60s</div>
        <div style={{ color: "var(--muted)" }}>Diagnóstico</div>
        </div>

        <div>
        <div style={{ fontSize: 26, fontWeight: 800 }}>3–25</div>
        <div style={{ color: "var(--muted)" }}>Min por bloque</div>
        </div>

        <div>
        <div style={{ fontSize: 26, fontWeight: 800 }}>Nivel 1–5</div>
        <div style={{ color: "var(--muted)" }}>Progresión</div>
        </div>
    </div>
    </div>
</div>
</div>

{/* ====== SECCIÓN 2: SUBJECTS GRID ====== */}
<div className="section">
<div className="container">
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
    <div>
        <h2 style={{ margin: 0 }}>Explora por materia</h2>
        <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>
        Accede a bloques recomendados o explora libremente según tus metas.
        </p>
    </div>

    <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-outline">Ver catálogo</button>
        <button className="btn btn-primary">Empezar diagnóstico</button>
    </div>
    </div>

    <div
    style={{
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
    }}
    >
    {[
        { title: "Matemáticas", desc: "Aritmética, álgebra, funciones y práctica guiada.", tag: "Precisión" },
        { title: "Lenguaje", desc: "Comprensión, escritura y vocabulario por nivel.", tag: "Claridad" },
        { title: "Ciencias", desc: "Física básica, biología y método científico.", tag: "Curiosidad" },
        { title: "Sociales", desc: "Historia, ciudadanía y pensamiento crítico.", tag: "Contexto" },
        { title: "Tecnología", desc: "Fundamentos digitales, lógica y herramientas.", tag: "Habilidad" },
        { title: "Finanzas", desc: "Ahorro, interés, decisiones y hábitos.", tag: "Vida real" },
    ].map((s) => (
        <div key={s.title} className="card" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <h3 style={{ margin: 0 }}>{s.title}</h3>
            <span
            style={{
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                color: "var(--muted)",
                background: "rgba(245, 158, 11, 0.10)", // acento amarillo suave
            }}
            >
            {s.tag}
            </span>
        </div>

        <p style={{ margin: "10px 0 14px", color: "var(--muted)" }}>{s.desc}</p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-outline">Ver bloques</button>
            <button className="btn btn-primary">Recomendado</button>
        </div>
        </div>
    ))}
    </div>

    <div style={{ marginTop: 14, color: "var(--muted)", fontSize: 13 }}>
    *Contenido de prueba. Luego lo conectamos a tu backend / learning blocks.
    </div>
</div>
</div>

{/* ====== SECCIÓN 3: HOW IT WORKS ====== */}
<div className="section">
<div className="container">
    <h2 style={{ margin: 0 }}>Cómo funciona</h2>
    <p style={{ margin: "8px 0 18px", color: "var(--muted)" }}>
    Un flujo simple: diagnóstico → dashboard → bloques recomendados.
    </p>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
    {[
        {
        step: "1",
        title: "Diagnóstico rápido",
        desc: "Responde preguntas cortas para estimar tu nivel por materia.",
        accent: "var(--blue-600)",
        },
        {
        step: "2",
        title: "Perfil y recomendaciones",
        desc: "Tu dashboard muestra scores y rutas sugeridas según resultados.",
        accent: "var(--yellow-500)",
        },
        {
        step: "3",
        title: "Bloques y práctica",
        desc: "Aprende en bloques cortos y refuerza con ejercicios.",
        accent: "var(--red-500)",
        },
    ].map((x) => (
        <div key={x.step} className="card" style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
            style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "white",
                background: x.accent,
            }}
            >
            {x.step}
            </div>
            <h3 style={{ margin: 0 }}>{x.title}</h3>
        </div>

        <p style={{ margin: "10px 0 0", color: "var(--muted)" }}>{x.desc}</p>
        </div>
    ))}
    </div>
</div>
</div>

{/* ====== SECCIÓN 4: CTA FINAL ====== */}
<div className="section">
<div className="container">
    <div
    className="card"
    style={{
        padding: 22,
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        alignItems: "center",
        flexWrap: "wrap",
    }}
    >
    <div style={{ maxWidth: 520 }}>
        <h2 style={{ margin: 0 }}>Empieza ahora</h2>
        <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>
        Haz el diagnóstico y recibe una ruta inicial con bloques recomendados para avanzar rápido.
        </p>
    </div>

    <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-outline">Ver demo</button>
        <button className="btn btn-primary">Empezar diagnóstico</button>
    </div>
    </div>
</div>
</div>

</div>
);
}