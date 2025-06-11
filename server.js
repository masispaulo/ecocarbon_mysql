const express = require('express');
const path = require('path');
const app = express();

// Permite receber JSON no body das requisições
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando! 🚀');
});

// Rota de cadastro de cooperado (importando o router)
const cooperadoRouter = require('../routes/auth');
app.use('/api/cooperados', cooperadoRouter);

// Inicializa o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});