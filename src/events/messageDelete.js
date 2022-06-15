const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("node:path");

module.exports = {
  name: "messageDelete",
  async execute(client, message) {
    if (message.author.bot) return;
    const date = new Date().toString();

    const configFilePath = path.resolve(__dirname, "../../config.json");
    const configFile = fs.readFileSync(configFilePath);
    let config = JSON.parse(configFile);
    config = config.Channels;

    const logChannel = message.guild.channels.cache.find(
      (channel) => channel.id === config["messageDelete"]
    );

    msg =
      message.content.toString() == "" ? "No text" : message.content.toString();

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${message.author.tag}`,
        iconURL: `${message.author.avatarURL()}`,
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
