const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildBanRemove",
  async execute(client, ban) {
    const date = new Date().toString();
    const guildBanEntry = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_BAN_REMOVE",
    });
    const unbanLog = guildBanEntry.entries.first();
    const channel = client.channels.cache.get("963791132196761620");

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${unbanLog.executor.tag}`,
        iconURL: `${unbanLog.executor.avatarURL()}`,
      })
      .setTitle("User was unbanned.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Target", value: unbanLog.target.tag, inline: true },
        { name: "Executor", value: unbanLog.executor.tag, inline: true }
      );

    await channel.send({ embeds: [embedMessage] });
  },
};
