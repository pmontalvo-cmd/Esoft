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
    <div className="account-container">
    <h2>Mi Cuenta</h2>

    <div className="account-card">
        <p><strong>Username:</strong> {dbUser.username}</p>
        <p><strong>Nombre:</strong> {dbUser.first_name} {dbUser.middle_name} {dbUser.last_name}</p>
        <p><strong>Grade:</strong> {dbUser.grade}</p>
        <p><strong>ID:</strong> {dbUser.id}</p>
    </div>

    <h3 style={{ marginTop: 16 }}>Scores</h3>
    <div className="account-card">
        <p><strong>Math:</strong> {dbUser.math_score ?? "—"}</p>
        <p><strong>Science:</strong> {dbUser.science_score ?? "—"}</p>
        <p><strong>Language:</strong> {dbUser.language_score ?? "—"}</p>
        <p><strong>Social:</strong> {dbUser.social_score ?? "—"}</p>
        <p><strong>Tech:</strong> {dbUser.tech_score ?? "—"}</p>
        <p><strong>Finance:</strong> {dbUser.finance_score ?? "—"}</p>
        <p><strong>Logic:</strong> {dbUser.logic_score ?? "—"}</p>
    </div>
    </div>
);
};

export default Account;