const mongoose = require('mongoose');

const filaSchema = new mongoose.Schema({
  canalId: { type: String, required: true },
  vs: { type: String, required: true, enum: ['1x1','2x2','3x3','4x4'] },
  modo: {
    type: String,
    required: true,
    enum: ['mobile', 'emu', 'misto', 'full-soco'],
  },
  valor: { type: Number, required: true, min: 0 },
  jogadores: { type: [String], default: [] },
  premium: { type: Boolean, default: false },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('Fila', filaSchema);
