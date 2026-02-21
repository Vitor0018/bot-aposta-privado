const Aposta = require('../../api/models/aposta');
const Historico = require('../../api/models/historico');

module.exports = {
  name: 'apostar',
  description: 'Realiza uma aposta em uma aposta ativa do canal',
  async execute(message, args, client) {
    try {
      if (!Aposta.collection.conn.readyState) {
        return message.reply('Banco de dados não está conectado.');
      }
      const canalId = message.channel.id;
      const aposta = await Aposta.findOne({ canalId, status: 'open' });
      if (!aposta) return message.reply('Não há aposta ativa neste canal.');
      if (aposta.jogadores.includes(message.author.id)) {
        return message.reply('Você já está nessa aposta.');
      }
      aposta.jogadores.push(message.author.id);
      await aposta.save();
      await Historico.create({ usuario: message.author.id, acao: 'apostar', detalhes: { apostaId: aposta._id } });
      message.reply('Aposta registrada.');
    } catch (err) {
      console.error('apostar command error:', err);
      message.reply('Erro ao apostar.');
    }
  },
};