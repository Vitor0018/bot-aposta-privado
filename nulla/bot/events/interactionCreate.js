module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isButton()) {
      const Fila = require('../../api/models/fila');
      const custom = interaction.customId;
      const parts = custom.split('_');
      // expected fila_normal_valor, fila_premium_valor, fila_sair_valor
      const action = parts[1];
      const valor = parseFloat(parts[2]);
      const canalId = interaction.channelId;

      // parse vs and mode from channel name
      const { parseChannelName } = require('../services/queue');
      const parsed = parseChannelName(interaction.channel.name || '');
      const vs = parsed ? parsed.vs : null;
      const modo = parsed ? parsed.modo : null;

      // find or create fila
      let fila = await Fila.findOne({ canalId, valor, premium: action === 'premium' });
      if (!fila) {
        fila = new Fila({ canalId, valor, premium: action === 'premium', jogadores: [], vs, modo });
      }

      if (action === 'sair') {
        fila.jogadores = fila.jogadores.filter(id => id !== interaction.user.id);
        await fila.save();
        const Historico = require('../../api/models/historico');
        await Historico.create({ usuario: interaction.user.id, acao: 'sair_fila', detalhes: { canalId, valor, premium: action==='premium' } });
        // update embed
        if (interaction.message) {
          const players = fila.jogadores.map(id => `<@${id}>`).join(', ') || 'Nenhum jogador na fila';
          const newEmbed = {
            ...interaction.message.embeds[0],
            description: `🎮 Modo: ${modo}\n💰 Valor: R$ ${valor.toFixed(2)}\n👤 Jogadores: ${players}`,
          };
          await interaction.message.edit({ embeds: [newEmbed] }).catch(() => {});
        }
        await interaction.reply({ content: 'Você saiu da fila.', ephemeral: true });
        return;
      }

      // add player
      if (!fila.jogadores.includes(interaction.user.id)) {
        fila.jogadores.push(interaction.user.id);
        await fila.save();
        const Historico = require('../../api/models/historico');
        await Historico.create({ usuario: interaction.user.id, acao: 'entrar_fila', detalhes: { canalId, valor, premium: action==='premium' } });
        if (interaction.message) {
          const players = fila.jogadores.map(id => `<@${id}>`).join(', ') || 'Nenhum jogador na fila';
          const newEmbed = {
            ...interaction.message.embeds[0],
            description: `🎮 Modo: ${modo}\n💰 Valor: R$ ${valor.toFixed(2)}\n👤 Jogadores: ${players}`,
          };
          await interaction.message.edit({ embeds: [newEmbed] }).catch(() => {});
        }
      }
      await interaction.reply({ content: `Entrou na fila ${action === 'premium' ? 'premium' : 'normal'} R$${valor.toFixed(2)}.`, ephemeral: true });

      // check limit based on vs
      const limits = { '1x1': 2, '2x2': 4, '3x3': 6, '4x4': 8 };
      const max = limits[vs] || Infinity;
      if (fila.jogadores.length >= max) {
        fila.status = 'closed';
        await fila.save();
        const modRole = interaction.guild.roles.cache.find(r => r.name === 'Mediador');
        let mention = '';
        if (modRole) mention = `<@&${modRole.id}>`;
        // fetch guild-specific emojis
        const GuildConfig = require('../../api/models/guildconfig');
        const cfg = await GuildConfig.findOne({ guildId: interaction.guild.id });
        const emojiBrake = (cfg && cfg.emoji_sair) || '🟥';
        await interaction.channel.send(`${mention} fila ${vs} R$${valor.toFixed(2)} ${action === 'premium' ? 'premium' : 'normal'} atingiu limite e foi bloqueada. ${emojiBrake}`);
      }
    }
  },
};