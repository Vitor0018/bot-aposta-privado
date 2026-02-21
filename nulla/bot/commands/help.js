module.exports = {
  name: 'help',
  description: 'Lista os comandos disponíveis',
  async execute(message, args, client) {
    try {
      const cmds = Array.from(client.commands.values()).map(c => `**${c.name}** - ${c.description}`).join('\n');
      message.reply(`📘 Comandos:\n${cmds}`);
    } catch (err) {
      console.error(err);
      message.reply('Erro ao listar comandos.');
    }
  },
};