const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT), // 👈 convertir a número
  ssl: {
    rejectUnauthorized: false // 👈 necesario en Railway
  },
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
