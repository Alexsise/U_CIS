const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelDelete",
  async execute(client, channel) {
    const date = new Date().toString();
    const guildLog = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_DELETE",
    });
    const channelLog = guildLog.entries.first();

    if (!channelLog)
      return console.log(
        `${ban.user.tag} was deleted, but Audit Logs didn\`t catch that.`
      );

    const logChannel = client.channels.cache.get("963791132196761620");

    const embedMessage = new MessageEmbed()
      .setTitle("Channel was deleted.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Channel", value: channelLog.target.name, inline: true },
        { name: "Deleted by", value: channelLog.executor.tag, inline: true }
      );

    await logChannel.send({ embeds: [embedMessage] });
  },
};
