import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar({ vprueba, user }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <nav className="app-navbar">
        <div className="nav-left">
        <img
            className="nav-logo"
            src="https://i.postimg.cc/v8WZJF25/Captura-de-pantalla-2025-03-05-105550.png"
            alt="Software Logo"
        />

        <Link to="/alumnos" className="brand">
            <span className="brand-math">Math</span>
            <span className="brand-pro">Pro</span>
        </Link>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span>{menuOpen ? '✕' : '☰'}</span>
        </button>

        <div className={menuOpen ? "sidebar open" : "sidebar"}>
        <ul className="sidebar-links">
            <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/quizIn" onClick={() => setMenuOpen(false)}>Quiz</Link></li>
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><Link to="/alumnos" className="cta-button" onClick={() => setMenuOpen(false)}>Sign In</Link></li>
            <li><Link to="/singin" className="cta-button" onClick={() => setMenuOpen(false)}>Log In</Link></li>
            <li className="user-info">{vprueba && <span>{vprueba}, {user?.username || "Guest"}</span>}</li>
        </ul>
        </div>
    </nav>
    );
}

export default Navbar;