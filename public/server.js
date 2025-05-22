const express = require('express'); // Importa o framework Express
const app = express(); // Cria uma aplicação Express

// Rota inicial para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando! 🚀');
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});