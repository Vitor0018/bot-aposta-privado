module.exports = {
  name: 'guildCreate',
  async execute(guild) {
    try {
      const ownerMsgChannel = guild.systemChannel || guild.channels.cache.find(c => c.type === 'GUILD_TEXT');
      if (ownerMsgChannel) {
        ownerMsgChannel.send('Olá, meu chefe 😎').catch(console.error);
      }

      // create roles if not exist
      const roles = ['Dono', 'Administrador', 'Mediador'];
      for (const roleName of roles) {
        if (!guild.roles.cache.some(r => r.name === roleName)) {
          await guild.roles.create({ name: roleName, reason: 'Setup roles for NULLA bot' });
        }
      }

      // create categories and channels
      const categories = {
        '📱 ✦ MOBILE': ['1x1-mobile', '2x2-mobile', '3x3-mobile', '4x4-mobile'],
        '🖥️ ✦ EMULADOR': ['1x1-emu', '2x2-emu', '3x3-emu', '4x4-emu'],
        '📱🖥️ ✦ MISTO': ['2x2-misto', '3x3-misto', '4x4-misto'],
        '🥊 ✦ FULL SOCO': ['regras-full-soco', '1x1-full-soco', '2x2-full-soco', '3x3-full-soco', '4x4-full-soco'],
      };
      for (const [catName, channels] of Object.entries(categories)) {
        let cat = guild.channels.cache.find(c => c.name === catName && c.type === 4); // 4 = GUILD_CATEGORY
        if (!cat) {
          cat = await guild.channels.create({ name: catName, type: 4 });
        }
        for (const ch of channels) {
          if (!guild.channels.cache.some(c => c.name === ch)) {
            await guild.channels.create({ name: ch, type: 0, parent: cat.id });
          }
        }
      }
    } catch (err) {
      console.error('Error in guildCreate event:', err);
    }
  },
};