const Aposta = require('../../api/models/aposta');
const Usuario = require('../../api/models/usuario');
const Historico = require('../../api/models/historico');

module.exports = {
  name: 'finalizaraposta',
  description: 'Finaliza uma aposta e escolhe o vencedor',
  async execute(message, args, client) {
    try {
      const canalId = message.channel.id;
      const aposta = await Aposta.findOne({ canalId, status: 'open' });
      if (!aposta) return message.reply('Não há aposta aberta neste canal.');

      const winnerMention = message.mentions.users.first();
      if (!winnerMention) {
        return message.reply('Mencione o vencedor ao finalizar.');
      }
      const winnerId = winnerMention.id;
      if (!aposta.jogadores.includes(winnerId)) {
        return message.reply('O jogador indicado não está na aposta.');
      }

      aposta.vencedor = winnerId;
      aposta.status = 'closed';
      await aposta.save();

      // update ranking
      const usuario = await Usuario.findOneAndUpdate(
        { discordId: winnerId },
        { $inc: { ranking: 1 } },
        { new: true, upsert: true }
      );

      await Historico.create({ usuario: message.author.id, acao: 'finalizaraposta', detalhes: { apostaId: aposta._id, vencedor: winnerId } });

      message.channel.send(`Aposta finalizada. Vencedor: <@${winnerId}>`);
    } catch (err) {
      console.error(err);
      message.reply('Erro ao finalizar aposta.');
    }
  },
};