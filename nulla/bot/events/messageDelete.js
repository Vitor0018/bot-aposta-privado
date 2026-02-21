const { parseChannelName, generateValues } = require('../services/queue');

module.exports = {
  name: 'messageDelete',
  async execute(message, client) {
    if (!message.author || message.author.id !== client.user.id) return;
    // if a bot card is deleted, regenerate for that channel
    const channel = message.channel;
    const parsed = parseChannelName(channel.name);
    if (!parsed) return;

    // regenerate only if it looked like a card embed
    if (message.embeds && message.embeds.length) {
      // simply regenerate entire channel by calling the command logic
      const fakeMessage = { channel, member: message.member, reply: () => {} };
      const cmd = client.commands.get('gerarfilas');
      if (cmd) {
        await cmd.execute({
          ...fakeMessage,
          author: message.author,
        }, [], client);
      }
    }
  },
};