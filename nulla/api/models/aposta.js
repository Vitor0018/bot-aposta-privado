const mongoose = require('mongoose');

const apostaSchema = new mongoose.Schema({
  canalId: { type: String, required: true },
  vs: { type: String, required: true, enum: ['1x1','2x2','3x3','4x4'] },
  modo: {
    type: String,
    required: true,
    enum: ['mobile', 'emu', 'misto', 'full-soco'],
  },
  valor: { type: Number, required: true, min: 0 },
  jogadores: { type: [String], default: [] },
  vencedor: { type: String, default: undefined },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('Aposta', apostaSchema);
