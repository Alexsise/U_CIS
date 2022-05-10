const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageUpdate",
  async execute(client, oldMessage, newMessage) {
    if (oldMessage.system) return;
    if (newMessage.content == oldMessage.content) return;

    const date = new Date().toString();
    const logChannel = oldMessage.guild.channels.cache.find(
      (channel) => channel.name === "log"
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
          name: "Old message",
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
