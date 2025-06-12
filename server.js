const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'seu_host',
  user: 'seu_user',
  password: 'sua_senha',
  database: 'seu_banco'
});

// Cadastro de cooperado
app.post('/api/cooperados/cadastro', async (req, res) => {
  const {
    nome,
    usuario,
    email,
    whatsapp,
    endereco,
    cep,
    cidade,
    estado,
    profissao,
    senha
  } = req.body;

  try {
    // Validação básica
    if (!nome || !usuario || !email || !senha) {
      return res.status(400).json({ message: 'Nome, usuário, e-mail e senha são obrigatórios.' });
    }

    // Verifica se o usuário ou e-mail já existem
    const [existe] = await db.query(
      'SELECT id FROM cooperados WHERE usuario = ? OR email = ?', [usuario, email]
    );
    if (existe.length) {
      return res.status(409).json({ message: 'Usuário ou e-mail já cadastrado.' });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    await db.query(
      'INSERT INTO cooperados (nome, usuario, email, whatsapp, endereco, cep, cidade, estado, profissao, senha_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, usuario, email, whatsapp, endereco, cep, cidade, estado, profissao, senha_hash]
    );

    res.json({ success: true, message: "Cooperado cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao cadastrar cooperado" });
  }
});

// Login por usuário ou e-mail
app.post('/api/cooperados/login', async (req, res) => {
  const { usuarioOuEmail, senha } = req.body;
  try {
    // Busca por usuário ou e-mail
    const [rows] = await db.query(
      'SELECT * FROM cooperados WHERE usuario = ? OR email = ?', [usuarioOuEmail, usuarioOuEmail]
    );
    if (!rows.length) {
      return res.status(401).json({ message: "Usuário/e-mail ou senha inválidos!" });
    }
    const cooperado = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, cooperado.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Usuário/e-mail ou senha inválidos!" });
    }
    delete cooperado.senha_hash;
    res.json({ success: true, cooperado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});