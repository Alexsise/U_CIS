const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",
  async execute(client, oldMember, newMember) {
    const date = new Date().toString();
    const logChannel = oldMember.guild.channels.cache.find(
      (channel) => channel.name === "log"
    );
    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${oldMember.user.tag}`,
        iconURL: `${oldMember.user.avatarURL()}`,
      })
      .setTitle("User was updated")
      .setDescription(date);
    if (oldMember.nickname != newMember.nickname)
      embedMessage.addFields(
        {
          name: "Old Nickname",
          value: oldMember.displayName,
          inline: true,
        },
        {
          name: "New Nickname",
          value: newMember.displayName,
          inline: true,
        }
      );
    logChannel.send({ embeds: [embedMessage] });
  },
};
