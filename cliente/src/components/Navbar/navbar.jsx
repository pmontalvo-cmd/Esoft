import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar({user,  onLogout}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <nav className="app-navbar">
        <div className="container nav-inner">
        <Link to="/home" className="brand">
        <span className="brand-mark">EM</span>
        <span className="brand-text">ECUMENTIS</span>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/quizIn">Quiz</Link>
            <Link to="/dashboard">Dashboard</Link>
            {!user ? (<>
            <Link to="/alumnos">Sign In</Link>
            <Link to="/singin">Log In</Link>
            </>) : (<>
                <Link to="/account" className="nav-right-link">Account</Link>
                <button onClick={onLogout} className="logout-btn">Logout</button>
                    </>)}
        </div>

        {/* BOTÓN MÓVIL */}
        <button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
        {menuOpen ? "✕" : "☰"}
        </button>

        {/* SIDEBAR MÓVIL */}
        <div className={menuOpen ? "sidebar open" : "sidebar"}>
            <ul className="sidebar-links">
            <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/quizIn" onClick={() => setMenuOpen(false)}>Quiz</Link></li>
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            {!user ? (<>
                <li><Link to="/alumnos" onClick={() => setMenuOpen(false)}>Sign In</Link></li>
                <li><Link to="/singin" onClick={() => setMenuOpen(false)}>Log In</Link>
                </li></>) : (<>
                    <li><Link to="/account" onClick={() => setMenuOpen(false)}>Account</Link></li>
                    <li><button className="logout-btn" onClick={() => { setMenuOpen(false); onLogout(); }}>Logout</button></li>
                    </>)}
            </ul>
        </div>
        </div>
    </nav>
    );
}

