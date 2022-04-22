const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");
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

    if (!channelLog)
      return console.log(
        `${ban.user.tag} was created, but Audit Logs didn\`t catch that.`
      );

    const logChannel = client.channels.cache.get("963791132196761620");

    const embedMessage = new MessageEmbed()
      .setTitle("Channel was created.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Channel", value: channelLog.target.name, inline: true },
        { name: "Created by", value: channelLog.executor.tag, inline: true }
      );

    await logChannel.send({ embeds: [embedMessage] });
  },
};
