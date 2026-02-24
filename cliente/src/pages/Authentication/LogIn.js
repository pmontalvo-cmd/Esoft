import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await API.post("/login", {
        username,
        password,
      });

      const data = response.data;

      // Guardar datos
      localStorage.setItem("userId", String(data.id));
      localStorage.setItem("username", data.username);
      localStorage.setItem("grade", String(data.grade));

      // Alerta visual
      Swal.fire({
        title: `Bienvenido, ${data.username} 👋`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirigir al dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message || "Credenciales incorrectas");
      } else {
        setErrorMsg("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>

          {errorMsg && (
            <div className="alert alert-danger text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Usuario:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
