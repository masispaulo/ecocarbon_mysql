const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend (AGORA CORRETO!)
app.use(express.static(path.join(__dirname, 'public')));

// Auth APIs
app.use('/api', authRoutes);

// Protected example
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! Protected route.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});