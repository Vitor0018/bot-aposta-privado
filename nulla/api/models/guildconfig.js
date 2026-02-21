const mongoose = require('mongoose');

const guildConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  emoji_normal: { type: String, default: '🧊' },
  emoji_premium: { type: String, default: '🧊' },
  emoji_sair: { type: String, default: '🟥' },
  embed_color: { type: String, default: '#0099ff' },
}, { timestamps: true });

module.exports = mongoose.model('GuildConfig', guildConfigSchema);
