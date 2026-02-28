import React, { useEffect, useState } from "react";
import API from "../../services/api";

const Account = ({ user }) => {
const userId = user?.id ?? Number(localStorage.getItem("userId"));

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [dbUser, setDbUser] = useState(null);

useEffect(() => {
    const fetchUser = async () => {
    try {
        setLoading(true);
        setError("");

        if (!userId) throw new Error("No autorizado (sin userId).");

        const res = await API.get(`/user/${userId}`);
        setDbUser(res.data);
    } catch (e) {
        setError(e.message || "Error cargando usuario");
    } finally {
        setLoading(false);
    }
    };

    fetchUser();
}, [userId]);

if (!userId) return <div>No autorizado</div>;
if (loading) return <div>Cargando...</div>;
if (error) return <div style={{ color: "crimson" }}>{error}</div>;
if (!dbUser) return <div>No hay datos del usuario.</div>;

return (
<div className="account-page">
<section className="section section--accent section--tint-blue">
    <div className="container">
    <header className="account-head">
        <h1 className="section-title">Mi Cuenta</h1>
        <p className="section-subtitle">
        Datos del perfil y puntajes del diagnóstico.
        </p>
    </header>

    <div className="account-grid">
        <div className="card account-card">
        <div className="account-card__title">Perfil</div>

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
        </div>

        <div className="card account-card">
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