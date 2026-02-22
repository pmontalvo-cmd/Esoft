const mysql = require("mysql2");

//  Conexion con la Base de Datos
const db = mysql.createConnection({ host: "", user: "remote", password: "Cema5586", database: "pp" });

db.connect((err) => {
    if (err) {
        console.error("DB connection error:", err);
        return;
    }
    console.log("Database connected");
});


module.exports = db;