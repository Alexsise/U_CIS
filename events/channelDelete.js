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
    const logChannel = channel.guild.channels.cache.find(
      (channel) => channel.name === "log"
    );

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${channelLog.executor.tag}`,
        iconURL: `${channelLog.executor.avatarURL()}`,
      })
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
