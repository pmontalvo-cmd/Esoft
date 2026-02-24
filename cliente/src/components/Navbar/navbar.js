import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <h2>
          <span style={{ color: "red" }}>Math</span>Pro
        </h2>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/quiz" style={styles.link}>Quiz</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      </div>

      <div>
        {user ? (
          <div style={styles.userSection}>
            <span style={styles.userText}>Hola, {user} 👋</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={styles.loginBtn}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#3b2a50",
    color: "white"
  },
  logo: {
    fontSize: "20px"
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  userText: {
    fontWeight: "bold"
  },
  logoutBtn: {
    backgroundColor: "#ff4d4d",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  },
  loginBtn: {
    backgroundColor: "#6c63ff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  }
};

export default Navbar;
