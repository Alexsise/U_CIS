const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",
  async execute(client, oldMember, newMember) {
    const logChannel = oldMember.guild.channels.cache.find(
      (channel) => channel.name === "log"
    );
    if (oldMember.displayName !== newMember.displayName) {
      const embedMessage = new MessageEmbed()
        .setAuthor({
          name: `${oldMember.user.tag}`,
          iconURL: `${oldMember.user.avatarURL()}`,
        })
        .setTitle("Guild member`s name was updated.")
        .setDescription(date)
        .setColor("#000000")
        .addFields(
          {
            name: "Old Name",
            value: oldMsg,
          },
          {
            name: "New Name",
            value: newMsg,
          }
        );
      await logChannel.send({ embeds: [embedMessage] });
    }


  },
};
