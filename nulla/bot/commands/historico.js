const Historico = require('../../api/models/historico');

module.exports = {
  name: 'historico',
  description: 'Mostra histórico de apostas ou filas',
  async execute(message, args, client) {
    try {
      const items = await Historico.find().sort({ createdAt: -1 }).limit(20);
      if (items.length === 0) return message.reply('Nenhum histórico registrado.');
      const lines = items.map(h => `• [${h.acao}] ${h.usuario} ${h.detalhes ? JSON.stringify(h.detalhes) : ''}`);
      // Discord has limit on message length
      for (let i = 0; i < lines.length; i += 10) {
        await message.channel.send(lines.slice(i, i + 10).join('\n'));
      }
    } catch (err) {
      console.error(err);
      message.reply('Erro ao buscar histórico.');
    }
  },
};