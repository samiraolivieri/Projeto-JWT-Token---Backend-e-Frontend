const mysql = require("mysql2");

// conexão com banco
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "alunolab",
    database: "auth_db",
    port: "3303"
});

connection.connect(err => {
    if (err) {
        console.error("Erro ao conectar:", err);
    } else {
        console.log("Conectado ao MySQL");
    }
});

module.exports = connection;