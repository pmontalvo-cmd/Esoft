export const STRINGS = {
es: {
    nav_home: "Inicio",
    nav_quiz: "Diagnóstico",
    nav_dashboard: "Panel",
    nav_account: "Cuenta",
    nav_login: "Iniciar sesión",
    nav_signup: "Registrarse",
    nav_logout: "Cerrar sesión",

    dash_title: "Panel",
    dash_recommended: "Bloques recomendados",
    dash_recommended_negate: "No Hay Bloques Recomendados",
    dash_search_placeholder: "Buscar bloques (ej: física, interés, motion...)",
    dash_search_btn: "Buscar",
    dash_results: "Resultados",
    btn_open: "Abrir",
    btn_start: "Empezar",
    msg_loading: "Cargando...",
    msg_retry: "Reintentar",
    msg_error: "Error",

    subject_math: "Matemáticas",
    subject_science: "Ciencias",
    subject_language: "Lengua",
    subject_social: "Sociales",
    subject_tech: "Tecnología",
    subject_finance: "Finanzas",
    subject_logic: "Lógica",
    level: "Nivel",
    minutes: "min",
},
en: {
    nav_home: "Home",
    nav_quiz: "Quiz",
    nav_dashboard: "Dashboard",
    nav_account: "Account",
    nav_login: "Log In",
    nav_signup: "Sign Up",
    nav_logout: "Logout",

    dash_title: "Dashboard",
    dash_recommended: "Recommended Learning Blocks",
    dash_recommended_negate: "No Recomended Learning Blocks",
    dash_search_placeholder: "Search learning blocks (e.g., physics, interest, motion...)",
    dash_search_btn: "Search",
    dash_results: "Results",
    btn_open: "Open",
    btn_start: "Start",
    msg_loading: "Loading...",
    msg_retry: "Retry",
    msg_error: "Error",

    subject_math: "Math",
    subject_science: "Science",
    subject_language: "Language",
    subject_social: "Social",
    subject_tech: "Tech",
    subject_finance: "Finance",
    subject_logic: "Logic",
    level: "Level",
    minutes: "min",
},
};

export const getLang = () => localStorage.getItem("lang") || "es";
export const setLang = (lang) => localStorage.setItem("lang", lang);

export const t = (key) => {
const lang = getLang();
return STRINGS[lang]?.[key] ?? STRINGS.es[key] ?? key;
};

// Helpers para traducir valores de la BD
export const subjectLabel = (subject) => t(`subject_${subject}`) || subject;