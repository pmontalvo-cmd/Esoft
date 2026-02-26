import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      console.log("Attempting login with:", username, password);

      const response = await fetch("https://api.ecumentis.org/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      console.log("Response status code:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Server returned an error:", errorText);
        throw new Error(errorText || "Server error");
      }

      const data = await response.json();
      console.log("Received JSON data:", data);

      // Guardar datos en localStorage
      localStorage.setItem("userId", String(data.id));
      localStorage.setItem("username", data.username);
      localStorage.setItem("grade", String(data.grade));

      setSuccessMsg(`Login successful! Welcome, ${data.username}.`);
      Swal.fire({
        title: "Login exitoso",
        text: `Bienvenido ${data.username}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

      // Si el padre recibe datos
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }

      // Redirigir al dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg(error.message || "Invalid credentials");
    }
  };

  return (
<div className="page page--center">
  <div className="container">
    <div className="auth-shell">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>

          {errorMsg && (
            <div className="alert alert-danger">{errorMsg}</div>
          )}

          {successMsg && (
            <div className="alert alert-success">{successMsg}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Login;

