module.exports = {
  name: 'gerarfilas',
  description: 'Gera todos os cards de fila para o canal',
  async execute(message, args, client) {
    // only Dono or Administrador
    const allowed = ['Dono', 'Administrador'];
    if (!message.member.roles.cache.some(r => allowed.includes(r.name))) {
      return message.reply('Você não tem permissão para usar este comando.');
    }

    const channel = message.channel;
    const { parseChannelName, generateValues } = require('../services/queue');
    const GuildConfig = require('../api/models/guildconfig');

    const parsed = parseChannelName(channel.name);
    if (!parsed) return message.reply('Nome de canal inválido.');

    const { vs, modo } = parsed; // parseChannelName now returns modo alias
    // build list of values in descending order instead of ascending
    const values = generateValues().slice().reverse();

    // load server-specific config
    const guildId = channel.guild.id;
    const cfg = await GuildConfig.findOne({ guildId });
    const emojiNormal = (cfg && cfg.emoji_normal) || '🧊';
    const emojiPremium = (cfg && cfg.emoji_premium) || '🧊';
    const emojiSair = (cfg && cfg.emoji_sair) || '🟥';
    const embedColor = (cfg && cfg.embed_color) || '#0099ff';

    // delete previous messages by bot in channel (basic cleanup)
    const fetched = await channel.messages.fetch({ limit: 100 });
    const botMsgs = fetched.filter(m => m.author.id === client.user.id);
    await channel.bulkDelete(botMsgs, true).catch(console.error);

    // fetch some assets once
    const guild = message.guild;
    const guildName = guild ? guild.name : 'Servidor';
    const iconUrl = guild ? guild.iconURL({ dynamic: true, size: 1024 }) : null;
    // use bot's banner instead of server banner
    const bannerUrl = client.user ? client.user.bannerURL({ size: 1024 }) : null;

    // create a card for each value
    for (const valor of values) {
      const embed = {
        title: `${vs} | ${guildName}`,
        color: embedColor,
        // bot avatar as thumbnail
        thumbnail: client.user.avatarURL({ dynamic: true, size: 256 }),
        // use bot banner if available, otherwise guild icon
        image: bannerUrl ? { url: bannerUrl } : iconUrl ? { url: iconUrl } : undefined,
        description: `🎮 Modo: ${modo}\n💰 Valor: R$ ${valor.toFixed(2)}\n👤 Jogadores: Nenhum jogador na fila`,
      };

      if (iconUrl) {
        embed.thumbnail = { url: iconUrl };
      }
      if (bannerUrl) {
        embed.image = { url: bannerUrl };
      }

      const row = {
        type: 1,
        components: [
          {
            type: 2,
            label: `${emojiNormal} Gelo Normal`,
            style: 1,
            custom_id: `fila_normal_${valor}`,
          },
          {
            type: 2,
            label: `${emojiPremium} Gelo Infinito`,
            style: 1,
            custom_id: `fila_premium_${valor}`,
          },
          {
            type: 2,
            label: `${emojiSair} Sair da fila`,
            style: 4,
            custom_id: `fila_sair_${valor}`,
          },
        ],
      };
      await channel.send({ embeds: [embed], components: [row] });
    }

    message.reply('Cards gerados com sucesso.');
  },
};