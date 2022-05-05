const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;
    const date = new Date().toString();
    const channel = client.channels.cache.get("963791132196761620");
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
    await channel.send({ embeds: [embedMessage] });
  },
};
