const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/auth.js'); // ATENÇÃO AO .js NO FINAL
app.use('/api/cooperados', authRoutes);

app.get('/', (req, res) => {
  res.send('API rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});