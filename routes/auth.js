const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const router = express.Router();
const SECRET = 'ecocarbon-secret-key';

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required.' });
  const hashed = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], function(err) {
    if (err) return res.status(400).json({ error: 'User exists.' });
    res.status(201).json({ message: 'User registered.' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("🟡 Login recebido:", username, password); // <-- log 1

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) {
      console.log("🔴 Usuário não encontrado:", err, user); // <-- log 2
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    console.log("🟢 Senha salva no banco:", user.password); // <-- log 3
    const match = await bcrypt.compare(password, user.password);
    console.log("🔵 Resultado comparação bcrypt:", match); // <-- log 4

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, username }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
});

module.exports = router;
