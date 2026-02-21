const GuildConfig = require('../../api/models/guildconfig');

module.exports = {
  name: 'editar',
  description: 'Editar emojis ou cor das filas neste servidor',
  async execute(message, args, client) {
    const allowed = ['Dono', 'Administrador'];
    if (!message.member.roles.cache.some(r => allowed.includes(r.name))) {
      return message.reply('Você não tem permissão para usar este comando.');
    }

    if (args.length < 2) {
      return message.reply('Uso: !editar <chave> <valor>. Chaves: emoji_normal, emoji_premium, emoji_sair, color');
    }
    const key = args[0].toLowerCase();
    const value = args.slice(1).join(' ');
    const valid = ['emoji_normal','emoji_premium','emoji_sair','color'];
    if (!valid.includes(key)) {
      return message.reply('Chave inválida. Opções: ' + valid.join(', '));
    }

    const guildId = message.guild.id;
    let cfg = await GuildConfig.findOne({ guildId });
    if (!cfg) {
      cfg = new GuildConfig({ guildId });
    }
    if (key === 'color') {
      cfg.embed_color = value;
    } else {
      cfg[key] = value;
    }
    await cfg.save();
    message.reply(`Configuração \`${key}\` atualizada para \`${value}\`.`);
  },
};