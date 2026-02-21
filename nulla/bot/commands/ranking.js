const Usuario = require('../../api/models/usuario');

module.exports = {
  name: 'ranking',
  description: 'Mostra o ranking dos jogadores',
  async execute(message, args, client) {
    try {
      const top = await Usuario.find().sort({ ranking: -1 }).limit(10);
      if (top.length === 0) return message.reply('Ainda não há ranking registrado.');
      const lines = top.map((u, idx) => `${idx + 1}. <@${u.discordId}> — ${u.ranking}`);
      message.reply(`🏆 Ranking:\n${lines.join('\n')}`);
    } catch (err) {
      console.error(err);
      message.reply('Erro ao buscar ranking.');
    }
  },
};