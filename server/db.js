const Pool = require("pg").Pool;

//conectando com o banco de dados com o pg, colocando as credenciais
//para conectar com o banco e exportar

const pool = new Pool({
    user: "postgres",
    password: "13579",
    host: "localhost",
    port:"5432",
    database:"perntodo"
});

module.exports = pool;