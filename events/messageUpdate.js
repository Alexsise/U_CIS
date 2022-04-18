const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageUpdate",
  async execute(client, oldMessage, newMessage) {
    if (newMessage.content == oldMessage.content) return;
    const date = new Date().toLocaleString();
    const channel = client.channels.cache.get("963791132196761620");

    const embedMessage = new MessageEmbed()
      .setTitle("The message was deleted.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Author", value: newMessage.author.tag.toString(), inline: true, },
        { name: "Channel", value: newMessage.channel.toString(), inline: true },
        { name: "Old message", value: oldMessage.content.toString() },
        { name: "New Message", value: newMessage.content.toString() }
      );

    await channel.send({ embeds: [embedMessage] });
  },
};
