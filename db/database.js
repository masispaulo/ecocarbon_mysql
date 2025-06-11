const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'SEU_USUARIO_AQUI',       // ex: 'root'
  password: 'demazzi',     // ex: '123456' ou ''
  database: 'railway_cadastro_cooperados' // O nome do seu banco
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1); // Encerra o servidor se der erro
  } else {
    console.log('Conectado ao MySQL!');
  }
});

module.exports = connection;