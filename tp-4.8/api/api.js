const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur notre API!' });
});

// Route pour obtenir la date actuelle
app.get('/date', (req, res) => {
  res.json({ date: new Date().toLocaleString() });
});

// Route pour l'écho
app.post('/echo', (req, res) => {
  res.json({ echo: req.body });
});

app.listen(port, () => {
  console.log(`🚀 API démarrée sur le port ${port}`);
});
