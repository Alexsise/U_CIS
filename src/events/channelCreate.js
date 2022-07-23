const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("node:path");

module.exports = {
  name: "channelCreate",
  async execute(client, channel) {
    const date = new Date().toString();

    const guildLog = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_CREATE",
    });
    const channelLog = guildLog.entries.first();

    const configFilePath = path.resolve(__dirname, "../../config.json");
    const configFile = fs.readFileSync(configFilePath);
    let config = JSON.parse(configFile);
    config = config.Channels;

    const logChannel = channel.guild.channels.cache.find(
      (channel) => channel.id == config["channelCreate"]
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
        { name: "Channel", value: channelLog.target.name, inline: true },
        { name: "Deleted by", value: channelLog.executor.tag, inline: true }
      );

    return logChannel.send({ embeds: [embedMessage] });
  },
};
