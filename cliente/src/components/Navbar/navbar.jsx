import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ vprueba, user }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <nav className="app-navbar">
        <div className="nav-container">
        <div className="nav-left">
            <img className="nav-logo" src="" alt="Logo" />
            <Link to="/home" className="brand">
            <span className="brand-math">ECUMENTIS</span>
        </Link>
        </div>

        {/* LINKS DESKTOP */}
        <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/quizIn">Quiz</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/alumnos" className="nav-cta">Sign In</Link>
            <Link to="/singin" className="nav-cta">Log In</Link>
        </div>

        {/* BOTÓN MÓVIL */}
        <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            >
            <span>{menuOpen ? '✕' : '☰'}</span>
        </button>

        {/* SIDEBAR MÓVIL */}
        <div className={menuOpen ? "sidebar open" : "sidebar"}>
            <ul className="sidebar-links">
            <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/quizIn" onClick={() => setMenuOpen(false)}>Quiz</Link></li>
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><Link to="/alumnos" className="cta-button" onClick={() => setMenuOpen(false)}>Sign In</Link></li>
            <li><Link to="/singin" className="cta-button" onClick={() => setMenuOpen(false)}>Log In</Link></li>
            </ul>
        </div>
        </div>
    </nav>
    );
}

export default Navbar;