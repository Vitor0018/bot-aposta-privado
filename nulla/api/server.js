const express = require('express');
const cors = require('cors');
const { connect } = require('./database');

// models
const Fila = require('./models/fila');
const Aposta = require('./models/aposta');
const Usuario = require('./models/usuario');
const Historico = require('./models/historico');

const app = express();
app.use(cors());
app.use(express.json());

// connect to mongo
connect();

// basic routes
// filas
app.get('/filas', async (req, res) => {
  const filas = await Fila.find();
  res.json(filas);
});

app.get('/filas/:id', async (req, res) => {
  const fila = await Fila.findById(req.params.id);
  if (!fila) return res.status(404).json({ error: 'Not found' });
  res.json(fila);
});

app.post('/filas', async (req, res) => {
  try {
    const fila = new Fila(req.body);
    await fila.save();
    res.status(201).json(fila);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/filas/:id', async (req, res) => {
  try {
    const fila = await Fila.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fila) return res.status(404).json({ error: 'Not found' });
    res.json(fila);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/filas/:id', async (req, res) => {
  await Fila.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// apostas
app.get('/apostas', async (req, res) => {
  const apostas = await Aposta.find();
  res.json(apostas);
});

app.get('/apostas/:id', async (req, res) => {
  const aposta = await Aposta.findById(req.params.id);
  if (!aposta) return res.status(404).json({ error: 'Not found' });
  res.json(aposta);
});

app.post('/apostas', async (req, res) => {
  try {
    const aposta = new Aposta(req.body);
    await aposta.save();
    res.status(201).json(aposta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/apostas/:id', async (req, res) => {
  try {
    const aposta = await Aposta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aposta) return res.status(404).json({ error: 'Not found' });
    res.json(aposta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/apostas/:id', async (req, res) => {
  await Aposta.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// usuarios
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.get('/usuarios/:id', async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Not found' });
  res.json(usuario);
});

app.post('/usuarios', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: 'Not found' });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// historico
app.get('/historico', async (req, res) => {
  const hist = await Historico.find();
  res.json(hist);
});

app.get('/historico/:id', async (req, res) => {
  const item = await Historico.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/historico', async (req, res) => {
  try {
    const item = new Historico(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/historico/:id', async (req, res) => {
  try {
    const item = await Historico.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/historico/:id', async (req, res) => {
  await Historico.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// convenience for resetting entire database
app.post('/reset', async (req, res) => {
  await Fila.deleteMany({});
  await Aposta.deleteMany({});
  await Historico.deleteMany({});
  await Usuario.deleteMany({});
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('API running on port', PORT);
});
