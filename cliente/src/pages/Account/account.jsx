import React, { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const Account = ({ user }) => {
const userId = useMemo(
    () => (user?.id ? Number(user.id) : Number(localStorage.getItem("userId"))),
    [user?.id]
);

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const [dbUser, setDbUser] = useState(null);
const [takes_math, setTakes_math] = useState(0);
const [takes_lenguage, setTakes_lenguage] = useState(0);
const [takes_science, setTakes_science] = useState(0);
const [takes_social, setTakes_social] = useState(0);
const [takes_tech, setTakes_tech] = useState(0);
const [takes_finance, setTakes_finance] = useState(0);
const [takes_logic, setTakes_logic] = useState(0);

// Form editable (lo que el usuario modifica)
const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    grade: "",
    age: "",
    // password: ""  // si lo permites (ojo: idealmente endpoint separado)
});

const [saving, setSaving] = useState(false);
const [saveMsg, setSaveMsg] = useState("");

useEffect(() => {
    const fetchUser = async () => {
    try {
        setLoading(true);
        setError("");
        setSaveMsg("");

        if (!userId) throw new Error("No autorizado (sin userId).");

        const res = await API.get(`/user/${userId}`);
        const u = res.data;

        setDbUser(u);

        // Inicializa form con lo que viene de DB (importante)
        setForm({
        first_name: u.first_name ?? "",
        middle_name: u.middle_name ?? "",
        last_name: u.last_name ?? "",
        username: u.username ?? "",
        grade: u.grade ?? "",
        age: u.age ?? "",
        // password: ""
        });
    } catch (e) {
        setError(e.message || "Error cargando usuario");
    } finally {
        setLoading(false);
    }
    };

    fetchUser();
}, [userId]);

const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
};

const onUpdate = async () => {
    try {
    setSaving(true);
    setError("");
    setSaveMsg("");

    // Payload: reutiliza tu endpoint existente PUT /update (requiere id)
    const payload = {
        id: userId,
        first_name: form.first_name,
        middle_name: form.middle_name,
        last_name: form.last_name,
        username: form.username,
        age: form.age,
        grade: form.grade,
    };

    await API.put("/update", payload);

    // refresca UI
    setDbUser((prev) => (prev ? { ...prev, ...payload } : prev));
    setSaveMsg("Cambios guardados ✅");
    } catch (e) {
    setError(e.message || "Error actualizando usuario");
    } finally {
    setSaving(false);
    }
};

const onDeleteAccount = async () => {
    const ok = window.confirm(
    "¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
    );
    if (!ok) return;

    try {
    setSaving(true);
    setError("");
    setSaveMsg("");

    await API.delete(`/delete/${userId}`);

    // logout local
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("grade");

    // manda al login
    window.location.href = "/singin";
    } catch (e) {
    setError(e.message || "Error eliminando cuenta");
    } finally {
    setSaving(false);
    }
};

if (!userId) return <div className="account-page"><div className="container">No autorizado</div></div>;
if (loading) return <div className="account-page"><div className="container">Cargando...</div></div>;
if (error) return <div className="account-page"><div className="container" style={{ color: "crimson" }}>{error}</div></div>;
if (!dbUser) return <div className="account-page"><div className="container">No hay datos del usuario.</div></div>;

return (
    <div className="account-page">
    <section className="section section--accent">
        <div className="container">
        <header className="account-head">
            <h1 className="section-title">Mi Cuenta</h1>
            <p className="section-subtitle">Perfil y puntajes del diagnóstico.</p>
        </header>

        <div className="account-grid">
            {/* PERFIL (lectura) */}
            <div className="card account-card">
            <div className="account-card__title">Perfil (actual)</div>

            <div className="account-kv">
                <span className="account-k">Username</span>
                <span className="account-v">{dbUser.username}</span>
            </div>

            <div className="account-kv">
                <span className="account-k">Nombre</span>
                <span className="account-v">
                {dbUser.first_name} {dbUser.middle_name} {dbUser.last_name}
                </span>
            </div>

            <div className="account-kv">
                <span className="account-k">Grade</span>
                <span className="account-v">{dbUser.grade}</span>
            </div>

            <div className="account-kv">
                <span className="account-k">ID</span>
                <span className="account-v">{dbUser.id}</span>
            </div>

            {/*Botones De Materias*/} 
        <button className="btn btn-secondary m-1"
        onClick={() => setTakes_math(takes_math === 1 ? 0 : 1)}>
        {takes_math === 1 ? "Math ON" : "Math OFF"}
        </button>

        <button className="btn btn-secondary m-1"
        onClick={() => setTakes_lenguage(takes_lenguage === 1 ? 0 : 1)}>
        {takes_lenguage === 1 ? "Language ON" : "Language OFF"}
        </button>

        <button className="btn btn-secondary m-1"
        onClick={() => setTakes_science(takes_science === 1 ? 0 : 1)}>
        {takes_science === 1 ? "Science ON" : "Science OFF"}
        </button>

        <button className="btn btn-secondary m-1"
        onClick={() => setTakes_social(takes_social === 1 ? 0 : 1)}>
        {takes_social === 1 ? "Social ON" : "Social OFF"}
        </button>

        <button className="btn btn-secondary m-1"
        onClick={() => setTakes_tech(takes_tech === 1 ? 0 : 1)}>
        {takes_tech === 1 ? "Tech ON" : "Tech OFF"}
        </button>

        <button className="btn btn-secondary m-1"
        onClick={() => setTakes_finance(takes_finance === 1 ? 0 : 1)}>
        {takes_finance === 1 ? "Finance ON" : "Finance OFF"}
        </button>

        <button className="btn btn-secondary m-1"
        onClick={() => setTakes_logic(takes_logic === 1 ? 0 : 1)}>
        {takes_logic === 1 ? "Logic ON" : "Logic OFF"}
        </button>

            </div>

            {/* EDITAR PERFIL */}
            <div className="card account-card">
            <div className="account-card__title">Editar perfil</div>

            <div style={{ display: "grid", gap: 10 }}>
                <input className="form-control" value={form.username} onChange={onChange("username")} placeholder="Username" />
                <input className="form-control" value={form.first_name} onChange={onChange("first_name")} placeholder="Nombre" />
                <input className="form-control" value={form.middle_name} onChange={onChange("middle_name")} placeholder="Segundo nombre" />
                <input className="form-control" value={form.last_name} onChange={onChange("last_name")} placeholder="Apellido" />
                <input className="form-control" value={form.age} onChange={onChange("age")} placeholder="Edad" />
                <input className="form-control" value={form.grade} onChange={onChange("grade")} placeholder="Grado" />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                <button className="btn btn-warning" onClick={onUpdate} disabled={saving}>
                {saving ? "Guardando..." : "Actualizar"}
                </button>

                <button className="btn btn-outline-danger" onClick={onDeleteAccount} disabled={saving}>
                Eliminar cuenta
                </button>
            </div>

            {saveMsg && <p style={{ marginTop: 10, color: "#0f5132" }}>{saveMsg}</p>}
            </div>

            {/* SCORES */}
            <div className="card account-card" style={{ gridColumn: "1 / -1" }}>
            <div className="account-card__title">Scores</div>
            <div className="account-scores">
                <div className="account-scoreRow"><span>Math</span><b>{dbUser.math_score ?? "—"}</b></div>
                <div className="account-scoreRow"><span>Science</span><b>{dbUser.science_score ?? "—"}</b></div>
                <div className="account-scoreRow"><span>Language</span><b>{dbUser.language_score ?? "—"}</b></div>
                <div className="account-scoreRow"><span>Social</span><b>{dbUser.social_score ?? "—"}</b></div>
                <div className="account-scoreRow"><span>Tech</span><b>{dbUser.tech_score ?? "—"}</b></div>
                <div className="account-scoreRow"><span>Finance</span><b>{dbUser.finance_score ?? "—"}</b></div>
                <div className="account-scoreRow"><span>Logic</span><b>{dbUser.logic_score ?? "—"}</b></div>
            </div>
            </div>

        </div>
        </div>
    </section>
    </div>
);
};

export default Account;