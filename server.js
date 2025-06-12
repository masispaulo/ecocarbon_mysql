const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();

// Habilita CORS para seu domínio do Render
app.use(cors({
  origin: 'https://ecocarbon-mysql.onrender.com'
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com MySQL Railway (troque para os seus dados!)
const db = mysql.createPool({
  host: 'SEU_HOST_DO_RAILWAY',
  user: 'SEU_USER_DO_RAILWAY',
  password: 'SUA_SENHA_DO_RAILWAY',
  database: 'SEU_DATABASE_DO_RAILWAY'
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor funcionando! 🚀');
});

// Cadastro de cooperado (simulado, adapte para usar o banco depois se quiser)
app.post('/api/cooperados/cadastro', async (req, res) => {
  res.json({ success: true, message: "Cadastro simulado com sucesso!" });
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { usuario, senha } = req.body;
  const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario=? AND senha=?', [usuario, senha]);
  if (rows.length) {
    res.json({ sucesso: true, msg: "Login realizado!" });
  } else {
    res.status(401).json({ msg: "Usuário ou senha inválidos" });
  }
});

// ESQUECI SENHA
app.post('/api/auth/forgot', async (req, res) => {
  const { email } = req.body;
  const [rows] = await db.query('SELECT * FROM usuarios WHERE email=?', [email]);
  if (!rows.length) return res.status(404).json({ msg: "E-mail não encontrado" });

  const token = crypto.randomBytes(32).toString('hex');
  const tokenExpira = new Date(Date.now() + 60 * 60 * 1000);

  await db.query('UPDATE usuarios SET reset_token=?, reset_token_expira=? WHERE email=?', [token, tokenExpira, email]);

  // Configure para seu e-mail real!
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'SEU_EMAIL@gmail.com',
      pass: 'SUA_SENHA_DO_EMAIL'
    }
  });

  // Troque o domínio para o seu de produção
  const resetUrl = `https://ecocarbon-mysql.onrender.com/reset.html?token=${token}`;
  await transporter.sendMail({
    from: '"EcoCarbon" <SEU_EMAIL@gmail.com>',
    to: email,
    subject: "Recuperação de senha",
    html: `<p>Para redefinir sua senha, clique <a href="${resetUrl}">aqui</a>.<br>Se não foi você, ignore este e-mail.</p>`
  });
  res.json({ msg: "E-mail de recuperação enviado" });
});

// RESET DE SENHA
app.post('/api/auth/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { senha } = req.body;
  const [rows] = await db.query('SELECT * FROM usuarios WHERE reset_token=? AND reset_token_expira > NOW()', [token]);
  if (!rows.length) return res.status(400).json({ msg: "Token inválido ou expirado" });

  await db.query('UPDATE usuarios SET senha=?, reset_token=NULL, reset_token_expira=NULL WHERE reset_token=?', [senha, token]);
  res.json({ msg: "Senha redefinida com sucesso" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
