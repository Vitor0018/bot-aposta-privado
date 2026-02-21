const Fila = require('../../api/models/fila');
const Aposta = require('../../api/models/aposta');

module.exports = {
  name: 'status',
  description: 'Mostra status das filas e apostas no canal',
  async execute(message, args, client) {
    try {
      const canalId = message.channel.id;
      const filas = await Fila.find({ canalId });
      const apostas = await Aposta.find({ canalId });
      let text = `🔍 **Status do canal**\n`;
      if (filas.length) {
        text += `Filas: ${filas.length} (valores: ${filas.map(f => f.valor).join(', ')})\n`;
      } else {
        text += 'Sem filas.\n';
      }
      if (apostas.length) {
        text += `Apostas: ${apostas.length} (ativas: ${apostas.filter(a => a.status==='open').length})`;
      } else {
        text += 'Sem apostas.';
      }
      message.reply(text);
    } catch (err) {
      console.error(err);
      message.reply('Erro ao obter status.');
    }
  },
};