const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  ranking: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
