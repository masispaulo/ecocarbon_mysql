// Importação de módulos
require('dotenv').config(); // Carrega variáveis de ambiente do .env (funciona local e no Render)
const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Inicialização do Express
const app = express();

// Middleware CORS - ajuste o origin conforme o domínio do frontend
app.use(cors({
  origin: 'https://ecocarbon-mysql.onrender.com'
}));

// Middleware para receber JSON e servir arquivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com MySQL usando variáveis de ambiente
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// Rota inicial simples
app.get('/', (req, res) => {
  res.send('Servidor funcionando! 🚀');
});

// CADASTRO REAL DE COOPERADO
app.post('/api/cooperados/cadastro', async (req, res) => {
  const {
    nome,
    email,
    whatsapp,
    endereco,
    cep,
    cidade,
    estado,
    profissao,
    senha_hash // Receba a senha já como hash do frontend, para segurança
  } = req.body;

  try {
    await db.query(
      'INSERT INTO cooperados (nome, email, whatsapp, endereco, cep, cidade, estado, profissao, senha_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, email, whatsapp, endereco, cep, cidade, estado, profissao, senha_hash]
    );
    res.json({ success: true, message: "Cooperado cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao cadastrar cooperado" });
  }
});

// CADASTRO REAL DE USUÁRIO
app.post('/api/usuarios/cadastro', async (req, res) => {
  const { usuario, email, senha } = req.body;
  try {
    await db.query(
      'INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?)',
      [usuario, email, senha]
    );
    res.json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

// LOGIN USUÁRIO
app.post('/api/auth/login', async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE usuario=? AND senha=?',
      [usuario, senha]
    );
    if (rows.length) {
      res.json({ sucesso: true, msg: "Login realizado!" });
    } else {
      res.status(401).json({ msg: "Usuário ou senha inválidos" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// ESQUECI SENHA USUÁRIO
app.post('/api/auth/forgot', async (req, res) => {
  const { email } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email=?', [email]);
    if (!rows.length) return res.status(404).json({ msg: "E-mail não encontrado" });

    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpira = new Date(Date.now() + 60 * 60 * 1000);

    await db.query('UPDATE usuarios SET reset_token=?, reset_token_expira=? WHERE email=?', [token, tokenExpira, email]);

    // Configure seu e-mail real do Gmail e senha de app!
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetUrl = `https://ecocarbon-mysql.onrender.com/reset.html?token=${token}`;
    await transporter.sendMail({
      from: `"EcoCarbon" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recuperação de senha",
      html: `<p>Para redefinir sua senha, clique <a href="${resetUrl}">aqui</a>.<br>Se não foi você, ignore este e-mail.</p>`
    });
    res.json({ msg: "E-mail de recuperação enviado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao enviar e-mail de recuperação" });
  }
});

// RESET DE SENHA USUÁRIO
app.post('/api/auth/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { senha } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE reset_token=? AND reset_token_expira > NOW()', [token]);
    if (!rows.length) return res.status(400).json({ msg: "Token inválido ou expirado" });

    await db.query('UPDATE usuarios SET senha=?, reset_token=NULL, reset_token_expira=NULL WHERE reset_token=?', [senha, token]);
    res.json({ msg: "Senha redefinida com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao redefinir senha" });
  }
});

// Inicializa o servidor na porta configurada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});