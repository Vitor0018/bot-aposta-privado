module.exports = {
  name: 'help',
  description: 'Lista os comandos disponíveis',
  async execute(message, args, client) {
    const cmds = client.commands.map(c => `**${c.name}** - ${c.description}`).join('\n');
    message.reply(`📘 Comandos:\n${cmds}`);
  },
};