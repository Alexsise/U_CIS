const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("node:path");

module.exports = {
  name: "messageUpdate",
  async execute(client, oldMessage, newMessage) {
    if (oldMessage.system) return;
    if (newMessage.content == oldMessage.content) return;

    const date = new Date().toString();

    const configFilePath = path.resolve(__dirname, "../../config.json");
    const configFile = fs.readFileSync(configFilePath);
    let config = JSON.parse(configFile);
    config = config.Channels;

    const logChannel = oldMessage.guild.channels.cache.find(
      (channel) => channel.id === config["messageUpdate"]
    );

    const author = oldMessage.author;

    oldMsg =
      oldMessage.content.toString() == ""
        ? "No text"
        : oldMessage.content.toString();

    newMsg =
      newMessage.content.toString() == ""
        ? "No text"
        : newMessage.content.toString();

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
          name: "Old Message",
          value: oldMsg,
        },
        {
          name: "New Message",
          value: newMsg,
        }
      );

    await logChannel.send({ embeds: [embedMessage] });
  },
};
