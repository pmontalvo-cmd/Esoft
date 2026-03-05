import React, { useState } from "react";

export default function Contact() {
const [form, setForm] = useState({ name: "", email: "", message: "" });
const [sent, setSent] = useState(false);

function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
}

function onSubmit(e) {
    e.preventDefault();
    // Placeholder API En Progreso
    setSent(true);
}

return (
    <main className="page">
    <section className="section section--accent">
        <div className="container">
        <h1 className="section-title">Contacto</h1>
        <p className="section-subtitle">Soporte, reportes o consultas.</p>

        {sent ? (
            <div className="card account-card">
            <h2>Mensaje enviado</h2>
            <p className="section-subtitle">Gracias. Te responderemos lo antes posible.</p>
            <button className="btn btn-outline" onClick={() => setSent(false)}>
                Enviar otro
            </button>
            </div>
        ) : (
            <form className="card account-card" onSubmit={onSubmit}>
            <div style={{ display: "grid", gap: 12 }}>
                <label>
                <div className="account-k">Nombre</div>
                <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid var(--border)" }}
                />
                </label>

                <label>
                <div className="account-k">Correo</div>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid var(--border)" }}
                />
                </label>

                <label>
                <div className="account-k">Mensaje</div>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={6}
                    style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid var(--border)", resize: "vertical" }}
                />
                </label>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setForm({ name: "", email: "", message: "" })}
                >
                    Limpiar
                </button>
                </div>
            </div>
            </form>
        )}
        </div>
    </section>
    </main>
);
}