// Login.js
import React, { useState } from "react";
import Swal from "sweetalert2";
import API from "../../services/api"; // ⚠️ Ajusta la ruta si api.js está en otra carpeta

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      console.log("Attempting login with:", username);

      const response = await API.post("/login", {
        username,
        password,
      });

      const data = response.data;

      localStorage.setItem("userId", String(data.id));
      localStorage.setItem("username", data.username);
      localStorage.setItem("grade", String(data.grade));

      setSuccessMsg(`Login successful! Welcome, ${data.username}.`);

      Swal.fire({
        title: "Registro exitoso",
        text: "Login successful!",
        icon: "success",
        timer: 3000,
      });

      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message || "Invalid credentials");
      } else {
        setErrorMsg("Server connection error");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}

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
  );
}

export default Login;
  </div>
);
}

export default Login;
