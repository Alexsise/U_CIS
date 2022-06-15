const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("node:path");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot || message.system) return;
    const date = new Date().toString();

    const configFilePath = path.resolve(__dirname, "../../config.json");
    const configFile = fs.readFileSync(configFilePath);
    let config = JSON.parse(configFile);
    config = config.Channels;

    const logChannel = message.guild.channels.cache.find(
      (channel) => channel.id === config["messageCreate"]
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
        { name: "Channel", value: message.channel.toString(), inline: true },
        {
          name: "Number of attachments",
          value: message.attachments.size.toString(),
          inline: true,
        }
      )
      .addField("Message", msg);

    await logChannel.send({ embeds: [embedMessage] });
  },
};
