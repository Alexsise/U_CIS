const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageDelete",
  async execute(client, message) {
    const date = new Date().toString();
    const channel = client.channels.cache.get("963791132196761620");

    const embedMessage = new MessageEmbed()
      .setTitle("The message was deleted.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Author", value: message.author.tag.toString(), inline: true },
        { name: "Channel", value: message.channel.toString(), inline: true },
        { name: "Message", value: message.content.toString() }
      );

    await channel.send({ embeds: [embedMessage] });
  },
};
