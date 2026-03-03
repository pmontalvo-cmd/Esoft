export const STRINGS = {
es: {
    // Navegation Bar
    nav_home: "Inicio",
    nav_quiz: "Diagnóstico",
    nav_dashboard: "Panel",
    nav_account: "Cuenta",
    nav_login: "Iniciar sesión",
    nav_signup: "Registrarse",
    nav_logout: "Cerrar sesión",

    // Dashboard
    dash_title: "Panel",
    dash_recommended: "Bloques recomendados",
    dash_recommended_negate: "No Hay Bloques Recomendados",
    dash_all_blocks: "Todos Los Bloques",
    dash_all_negate: "No Hay BLoques",
    dash_search_placeholder: "Buscar bloques (ej: física, interés, motion...)",
    dash_search_btn: "Buscar",
    dash_results: "Resultados",

    //Home
    home_subject_catalog: "Catálogo de temas" ,
    home_hero_title: "Conocimiento educativo, claro y organizado.",
    home_quickAcces_title: "Accesos rápidos",
    home_btn_search: "Buscar",
    home_btn_startQuiz: "Empezar diagnóstico",
    home_btn_open: "Abrir",
    home_toDashboard: "Ver Dashboard",
    home_stats_subjects: "Materias",
    home_stats_baseSubjects: "Temas Base",
    home_stats_minPBloks: "Minutos por Bloque",
    home_stats_progresion: "Progresión",
    home_catalog_title: "Explorar bloques",
    home_catalog_subTitle1: "Explorar por Área",
    home_catalog_subTitle2: "Explore por Nivel", 
    home_whyUs_title: "Porque EcuMentis",
    home_whyUs_subTitle: "Una enciclopedia gratuita para entender temas en minutos.",
    home_cta_subTitle: "Diagnóstico → dashboard → bloques sugeridos. O explora cualquier tema como consulta.",
    home_cta_exploreCatalog: "Explorar Catalogo",
    home_footer_subTitle: "Plataforma educativa para consulta rápida estilo enciclopedia + rutas recomendadas por diagnóstico.",

    //QUIZ
    quiz_done_title: "Diagnóstico completado",
    quiz_done_subtitle: "Listo. Ya generamos tus bloques recomendados según tus resultados. Puedes revisarlos ahora o explorar todo el catálogo.",
    quiz_done_cta: "Ver mis recomendados",
    quiz_done_catalog: "Explorar catálogo",

    // Global
    btn_open: "Abrir",
    btn_start: "Empezar",
    btn_show_all: "Mostrar Todos",
    btn_view_all: "Ver Todo",
    btn_recommended: "Recomendado",
    btn_show_recommended: "Mostrar Recomendados",
    msg_loading: "Cargando...",
    msg_retry: "Reintentar",
    msg_error: "Error",

    subject_math: "Matemáticas",
    subject_science: "Ciencias",
    subject_language: "Lenguaje",
    subject_social: "Estudios Sociales",
    subject_tech: "Tecnología",
    subject_finance: "Finanzas",
    subject_logic: "Lógica",
    level: "Nivel",
    minutes: "min",
},
en: {
    //Navegation Bar
    nav_home: "Home",
    nav_quiz: "Quiz",
    nav_dashboard: "Dashboard",
    nav_account: "Account",
    nav_login: "Log In",
    nav_signup: "Sign Up",
    nav_logout: "Logout",

    // Dashboard
    dash_title: "Dashboard",
    dash_recommended: "Recommended Learning Blocks",
    dash_recommended_negate: "No Recomended Learning Blocks",
    dash_all_blocks: "All Blocks",
    dash_all_negate: "No Blocks",
    dash_search_placeholder: "Search learning blocks (e.g., physics, interest, motion...)",
    dash_search_btn: "Search",
    dash_results: "Results",

    // Home
    home_subject_catalog: "Catalog Of Subjects" ,
    home_hero_title: "Educational knowledge, clear and organized.",
    home_quickAcces_title: "Quick Links",
    home_btn_search: "Search",
    home_btn_startQuiz: "Start Diagnostic",
    home_btn_open: "Open",
    home_toDashboard: "See Dashboard",
    home_stats_subjects: "Subjects",
    home_stats_baseSubjects: "Base Subjects",
    home_stats_minPBloks: "Minutes per Block",
    home_stats_progresion: "Progresion",
    home_catalog_title: "Explore Blocks",
    home_catalog_subTitle1: "Explore by Area",
    home_catalog_subTitle2: "Explore by Level",
    home_whyUs_title: "Why Ecumentis",
    home_whyUs_subTitle: "A Free Enciclopedia to understand topics in minutes",
    home_cta_subTitle: "Diagnostic → Dashboard → LearningBlocks Or explore any subject",
    home_cta_exploreCatalog: "Explore Catalog",
    home_footer_subTitle: "Educational platform for rapid and recommendation-based learning.",

    //QUIZ
    quiz_done_title: "Diagnostic complete",
    quiz_done_subtitle: "All set. We\'ve generated recommended learning blocks based on your results. You can view them now or browse the full catalog.",
    quiz_done_cta: "View my recommendations",
    quiz_done_catalog: "Browse catalog",

    // Global
    btn_open: "Open",
    btn_start: "Start",
    btn_show_all: "Show All",
    btn_view_all: "View All",
    btn_recommended: "Recommended",
    btn_show_recommended: "Show Recomended",
    msg_loading: "Loading...",
    msg_retry: "Retry",
    msg_error: "Error",

    subject_math: "Math",
    subject_science: "Science",
    subject_language: "Language",
    subject_social: "Social Studies",
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