const Aposta = require('../../api/models/aposta');
const Historico = require('../../api/models/historico');

module.exports = {
  name: 'cancelaraposta',
  description: 'Cancela sua participação em uma aposta aberta',
  async execute(message, args, client) {
    try {
      if (!Aposta.collection.conn.readyState) {
        return message.reply('Banco de dados não está conectado.');
      }
      const canalId = message.channel.id;
      const aposta = await Aposta.findOne({ canalId, status: 'open' });
      if (!aposta) return message.reply('Não há aposta ativa neste canal.');
      if (!aposta.jogadores.includes(message.author.id)) {
        return message.reply('Você não estava nessa aposta.');
      }
      aposta.jogadores = aposta.jogadores.filter(id => id !== message.author.id);
      await aposta.save();
      await Historico.create({ usuario: message.author.id, acao: 'cancelaraposta', detalhes: { apostaId: aposta._id } });
      message.reply('Sua aposta foi cancelada.');
    } catch (err) {
      console.error('cancelaraposta command error:', err);
      message.reply('Erro ao cancelar aposta.');
    }
  },
};