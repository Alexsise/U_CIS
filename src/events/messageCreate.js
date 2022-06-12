const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot || message.system) return;
    const date = new Date().toString();
    const logChannel = message.guild.channels.cache.find(
      (channel) => channel.name === "log"
    );
    const author = message.author;
    msg =
      message.content.toString() == "" ? "No text" : message.content.toString();

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${author.tag}`,
        iconURL: `${author.avatarURL()}`,
      })
      .setTitle("Message was created.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Author", value: author.tag, inline: true },
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
