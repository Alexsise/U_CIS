const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelCreate",
  async execute(client, channel) {
    const date = new Date().toString();

    const guildLog = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_CREATE",
    });
    const channelLog = guildLog.entries.first();
    const logChannel = channel.guild.channels.cache.find(
      (ch) => ch.name === "log"
    );

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${channelLog.executor.tag}`,
        iconURL: `${channelLog.executor.avatarURL()}`,
      })
      .setTitle("Channel was created.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Channel", value: channel, inline: true },
        { name: "Created by", value: channelLog.executor.tag, inline: true }
      );

    await logChannel.send({ embeds: [embedMessage] });
  },
};
