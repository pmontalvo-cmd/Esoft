import React from "react";

const Account = ({ user }) => {
if (!user) {
    return <div>No autorizado</div>;
}

return (
    <div className="account-container">
    <h2>Mi Cuenta</h2>

    <div className="account-card">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.id}</p>
    </div>
    </div>
);
};

export default Account;