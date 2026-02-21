const Fila = require('../../api/models/fila');
const Aposta = require('../../api/models/aposta');
const Historico = require('../../api/models/historico');

module.exports = {
  name: 'criaraposta',
  description: 'Cria uma aposta a partir da fila atual fechada',
  async execute(message, args, client) {
    try {
      if (!Fila.collection.conn.readyState) {
        return message.reply('Banco de dados não está conectado.');
      }
      const canalId = message.channel.id;
      const fila = await Fila.findOne({ canalId, status: 'closed' });
      if (!fila) return message.reply('Não há fila fechada neste canal para criar aposta.');
      const existing = await Aposta.findOne({ canalId, status: 'open' });
      if (existing) return message.reply('Já existe uma aposta aberta neste canal.');
      const aposta = new Aposta({
        canalId: fila.canalId,
        vs: fila.vs,
        modo: fila.modo,
        valor: fila.valor,
        jogadores: [...fila.jogadores],
      });
      await aposta.save();
      await Historico.create({ usuario: message.author.id, acao: 'criaraposta', detalhes: { canalId, valor: fila.valor } });
      message.reply('Aposta criada a partir da fila.');
    } catch (err) {
      console.error('criaraposta command error:', err);
      message.reply('Erro ao criar aposta.');
    }
  },
};