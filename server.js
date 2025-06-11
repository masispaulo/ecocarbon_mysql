const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Habilita CORS para seu domínio do Render
app.use(cors({
  origin: 'https://ecocarbon-mysql.onrender.com'
}));

// Permite receber JSON no body das requisições
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando! 🚀');
});

// Rota de cadastro de cooperado simulada (sem banco)
app.post('/api/cooperados/cadastro', (req, res) => {
  res.json({ success: true, message: "Cadastro simulado com sucesso!" });
});

// Inicializa o servidor na porta do ambiente ou 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
