
import React from "react";

const Account = ({ user }) => {
if (!user) {
    return <div>No autorizado</div>;
}

return (
    <div className="account-container">
    <h2>Mi Cuenta</h2>

    <div className="account-card">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Grade:</strong> {user.grade}</p>
        <p><strong>ID:</strong> {user.id}</p>
    </div>
    </div>
);
};

export default Account;