const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3310,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'dev-root',
    database: process.env.MYSQL_DATABASE || 'dossiers_patients',
    waitForConnections: true,
    connectionLimit: 10
});
console.log("Pool MySQL Initialisé !!!");

module.exports = pool;