import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar({ vprueba, user }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <img 
                src="https://i.postimg.cc/v8WZJF25/Captura-de-pantalla-2025-03-05-105550.png" //Imagen: Logo
                alt="Software Logo"
                style={{ width: "50px", height: "50px", marginRight: "0px", borderRadius: "10%" }}
            />
            
            <Link to="/alumnos" style={{ textDecoration: "none", display: "flex", alignItems: "center", fontSize: "2.2rem" }}>
                <span style={{ color: "Red" }}>Math</span>
                <span style={{ backgroundColor: "white", color: "#1E1E2F", padding: "8px 12px", borderRadius: "10px", marginLeft: "5px", fontWeight: "bold" }}>Pro</span>
            </Link>
            
            {/* Sidebar Toggle Button */}
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>

            <div className={menuOpen ? "sidebar open" : "sidebar"}>
                <ul className="sidebar-links">
                    <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/quizIn" onClick={() => setMenuOpen(false)}>Quiz</Link></li>
                    <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                    <li><Link to="alumnos" className="cta-button" onClick={() => setMenuOpen(false)}>Sign In</Link></li>
                    <li><Link to="/singin" className="cta-button" onClick={() => setMenuOpen(false)}>Log In</Link></li>
                    <li className="user-info">{vprueba && <span>{vprueba}, {user?.username || "Guest"}</span>}</li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
