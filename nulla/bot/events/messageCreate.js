const config = require('../config');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (!message.guild || message.author.bot) return;

    const prefix = config.prefixes.find(p => message.content.startsWith(p));
    if (!prefix) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    let command = client.commands.get(cmdName);
    if (!command) {
      // try alias lookup
      command = client.commands.find(c => c.aliases && c.aliases.includes(cmdName));
    }
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error(err);
      message.reply('Erro ao executar o comando.').catch(console.error);
    }
  },
};