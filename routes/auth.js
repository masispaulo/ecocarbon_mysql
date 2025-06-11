const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/database');
const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, email, whatsapp, endereco, cep, cidade, estado, profissao, usuario, senha } = req.body;

  if (!usuario || !nome || !email || !senha || !profissao) {
    return res.status(400).json({ error: 'Dados obrigatórios faltando.' });
  }

  try {
    const hash = await bcrypt.hash(senha, 10);

    db.query(
      `INSERT INTO cooperados 
        (nome, email, whatsapp, endereco, cep, cidade, estado, profissao, usuario, senha_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, whatsapp, endereco, cep, cidade, estado, profissao, usuario, hash],
      (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Usuário ou e-mail já cadastrado.' });
          return res.status(500).json({ error: 'Erro no banco de dados', details: err });
        }
        res.status(201).json({ msg: 'Cooperado cadastrado com sucesso!' });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Erro interno', details: err });
  }
});

module.exports = router;

module.exports = router;