const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Sirva a pasta 'public' na raiz
app.use(express.static(path.join(__dirname, 'public')));

// Importa as rotas de autenticação
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes); // <-- agora /api/register e /api/login funcionarão!

// Remova OU comente esta rota "/" para não sobrescrever seu site!
/*
app.get('/', (req, res) => {
  res.send('✅ Backend da EcoCarbon rodando na porta 3000');
});
*/

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});