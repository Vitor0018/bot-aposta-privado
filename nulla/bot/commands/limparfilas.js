const Fila = require('../../api/models/fila');

module.exports = {
  name: 'limpar',
  aliases: ['limparfilas'],
  description: 'Limpa todas as filas deste canal da base de dados',
  async execute(message, args, client) {
    const allowed = ['Dono', 'Administrador'];
    if (!message.member.roles.cache.some(r => allowed.includes(r.name))) {
      return message.reply('Você não tem permissão para usar este comando.');
    }

    try {
      if (!Fila.collection.conn.readyState) {
        return message.reply('Banco de dados não está conectado.');
      }
      await Fila.deleteMany({ canalId: message.channel.id });
      message.reply('Filas do canal removidas do banco.');
    } catch (err) {
      console.error('limparfilas command error:', err);
      message.reply('Erro ao limpar filas.').catch(console.error);
    }
  },
};
