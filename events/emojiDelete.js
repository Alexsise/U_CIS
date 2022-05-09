const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojiDelete",
  async execute(client, emoji) {
    const date = new Date().toString();

    const guildLog = await emoji.guild.fetchAuditLogs({
      limit: 1,
      type: "EMOJI_DELETE",
    });
    const emojiLog = guildLog.entries.first();
    const logChannel = emoji.guild.channels.cache.find(
      (channel) => channel.name === "log"
    );

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${emojiLog.executor.tag}`,
        iconURL: `${emojiLog.executor.avatarURL()}`,
      })
      .setTitle("Emoji was deleted.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: "Deleted by", value: emojiLog.executor.tag, inline: true },
        { name: "Animated", value: emoji.animated.toString() }
      )
      .setImage(emoji.url);

    await logChannel.send({ embeds: [embedMessage] });
  },
};
