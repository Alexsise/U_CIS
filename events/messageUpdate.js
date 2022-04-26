const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageUpdate",
  async execute(client, oldMessage, newMessage) {
    if (newMessage.content == oldMessage.content) return;

    const date = new Date().toString();
    const channel = client.channels.cache.get("963791132196761620");
    const author = oldMessage.author;

    oldMsg = oldMessage.content.toString() == "" ? "No text": message.content.toString();
    newMsg = newMessage.content.toString() == "" ? "No text": message.content.toString();

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${author.tag}`,
        iconURL: `${author.avatarURL()}`,
      })
      .setTitle("The message was updated.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        {
          name: "Author",
          value: newMessage.author.tag.toString(),
          inline: true,
        },
        { name: "Channel", value: newMessage.channel.toString(), inline: true },
        {
          name: "Old message",
          value: oldMsg,
        },
        {
          name: "New Message",
          value: newMsg,
        }
      );

    await channel.send({ embeds: [embedMessage] });
  },
};
