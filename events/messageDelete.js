const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageDelete",
  async execute(client, message) {
    const channel = client.channels.cache.get("963791132196761620");

    const embedMessage = new MessageEmbed()
      .setTitle("New Event!")
      .setDescription("Deleted Message Event.")
      .setColor("#ff0000")
      .addFields(
        {name: "Author", value: message.author.tag.toString(), inline: true},
        {name: "Channel", value: message.channel.toString(), inline: true},
        {name: "Message", value: message.content.toString()}
      )

    await channel.send({ embeds: [embedMessage] });
  },
};
