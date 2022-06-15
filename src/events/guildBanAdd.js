const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("node:path");

module.exports = {
  name: "guildBanAdd",
  async execute(client, ban) {
    const date = new Date().toString();

    const guildBanLog = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_BAN_ADD",
    });
    const banLog = guildBanLog.entries.first();

    const configFilePath = path.resolve(__dirname, "../../config.json");
    const configFile = fs.readFileSync(configFilePath);
    let config = JSON.parse(configFile);
    config = config.Channels;

    const logChannel = ban.guild.channels.cache.find(
      (channel) => channel.id === config["guildBanAdd"]
    );

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${banLog.executor.tag}`,
        iconURL: `${banLog.executor.avatarURL()}`,
      })
      .setTitle("User was banned.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Target", value: banLog.target.tag, inline: true },
        { name: "Executor", value: banLog.executor.tag, inline: true },
        { name: "Reason", value: banLog.reason ?? "Not specified" }
      );

    await logChannel.send({ embeds: [embedMessage] });
  },
};
