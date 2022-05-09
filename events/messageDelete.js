const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageDelete",
  async execute(client, message) {
    const date = new Date().toString();
    const guildLog = await message.guild.fetchAuditLogs({
      limit: 1,
      type: "MESSAGE_DELETE",
    });
    const messageLog = guildLog.entries.first();
    const logChannel = message.guild.channels.cache.find(
      (channel) => channel.name === "log"
    );
    msg =
      message.content.toString() == "" ? "No text" : message.content.toString();

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${messageLog.executor.tag}`,
        iconURL: `${messageLog.executor.avatarURL()}`,
      })
      .setTitle("The message was deleted.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        {
          name: "Author",
          value: message.author.tag,
          inline: true,
        },
        {
          name: "Deleted by",
          value: messageLog.executor.tag,
          inline: true,
        },
        { name: "Channel", value: message.channel.toString(), inline: true }
      )
      .addFields(
        { name: "Message", value: msg },
        {
          name: "Number of attachments",
          value: message.attachments.size.toString(),
        }
      );

    await logChannel.send({ embeds: [embedMessage] });
  },
};
