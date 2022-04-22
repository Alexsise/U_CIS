const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;
    const date = new Date().toString();
    const channel = client.channels.cache.get("963791132196761620");

    const embedMessage = new MessageEmbed()
      .setTitle("Message was created.")
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
