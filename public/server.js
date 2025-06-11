const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configuração de CORS flexível para local e produção (ajuste o origin para seu frontend no Render)
app.use(cors({
  origin: '*', // No Render, troque para seu domínio: 'https://SEU-FRONT.onrender.com'
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EXEMPLO DE ROTA DE API (AJUSTE PARA SUA LÓGICA)
app.post('/api/cooperados', async (req, res) => {
  // Seu código para criar um cooperado aqui
  // Exemplo simples:
  try {
    // const result = await db.insertCooperado(req.body);
    res.status(200).json({ message: "Cadastro realizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar cooperado" });
  }
});

// Opcional: resposta rápida para GET na home (testar deploy)
app.get('/', (req, res) => {
  res.send('API EcoCarbon rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});