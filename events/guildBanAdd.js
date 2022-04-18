const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildBanAdd",
  async execute(client, ban) {
    const date = new Date().toLocaleString();
    const guildBanLog = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_BAN_ADD",
    });
    const banLog = guildBanLog.entries.first();

    if (!banLog)
      return console.log(
        `${ban.user.tag} was banned, but Audit Logs didn\`t catch that.`
      );

    const channel = client.channels.cache.get("963791132196761620");

    const embedMessage = new MessageEmbed()
      .setTitle("User was banned.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Target", value: banLog.target.tag, inline: true },
        { name: "Executor", value: banLog.executor.tag, inline: true },
        { name: "Reason", value: banLog.reason ?? "Not specified" }
      );

    await channel.send({ embeds: [embedMessage] });
  },
};

