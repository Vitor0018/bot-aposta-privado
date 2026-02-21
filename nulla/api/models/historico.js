const mongoose = require('mongoose');

const historicoSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  acao: { type: String, required: true }, // ex: 'entrada fila', 'apostou', etc.
  detalhes: { type: mongoose.Schema.Types.Mixed, default: undefined },
}, { timestamps: true });

module.exports = mongoose.model('Historico', historicoSchema);
