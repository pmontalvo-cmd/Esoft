import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { getLang, setLang, t } from "../../i18n";
const [lang, setLangState] = useState(getLang());

const toggleLang = () => {
const next = lang === "es" ? "en" : "es";
setLang(next);
setLangState(next);
window.location.reload(); 
};
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
            <Link to="/home">{t("nav_home")}</Link>
            <Link to="/quizIn">{t("nav_quiz")}</Link>
            <Link to="/dashboard">{t("nav_dashboard")}</Link>
            {!user ? (<>
                <Link to="/alumnos">{t("nav_signup")}</Link>
                <Link to="/singin">{t("nav_login")}</Link>
                </>) : (<>
                    <Link to="/account" className="nav-right-link">{t("nav_account")}</Link>
                    <button onClick={onLogout} className="logout-btn">{t("nav_logout")}</button>
            </>)}
            <Link className="lang-btn" onClick={toggleLang}> {lang === "es" ? "EN" : "ES"}</Link>
        </div>

        {/* BOTÓN MÓVIL */}
        <button className="menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
        {menuOpen ? "✕" : "☰"}
        </button>

        {/* SIDEBAR MÓVIL */}
        <div className={menuOpen ? "sidebar open" : "sidebar"}>
            <ul className="sidebar-links">
            <li><Link to="/home" onClick={() => setMenuOpen(false)}>{t("nav_home")}</Link></li>
            <li><Link to="/quizIn" onClick={() => setMenuOpen(false)}>{t("nav_quiz")}</Link></li>
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>{t("nav_dashboard")}</Link></li>
            {!user ? (<>
                <li><Link to="/alumnos" onClick={() => setMenuOpen(false)}>{t("nav_signup")}</Link></li>
                <li><Link to="/singin" onClick={() => setMenuOpen(false)}>{t("nav_login")}</Link>
                </li></>) : (<>
                <li><Link to="/account" onClick={() => setMenuOpen(false)}>{t("nav_account")}</Link></li>
                <li><button className="logout-btn" onClick={() => { setMenuOpen(false); onLogout(); }}>{t("nav_logout")}</button></li>
            </>)}
                <li><Link className="lang-btn" onClick={toggleLang}> {lang === "es" ? "EN" : "ES"}</Link></li>
            </ul>
        </div>
        </div>
    </nav>
    );
}

