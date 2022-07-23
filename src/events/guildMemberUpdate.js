const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("node:path");

module.exports = {
  name: "guildMemberUpdate",
  async execute(client, oldMember, newMember) {
    const date = new Date().toString();

    const configFilePath = path.resolve(__dirname, "../../config.json");
    const configFile = fs.readFileSync(configFilePath);
    let config = JSON.parse(configFile);
    config = config.Channels;

    const logChannel = oldMember.guild.channels.cache.find(
      (channel) => channel.id === config["guildMemberUpdate"]
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
    return logChannel.send({ embeds: [embedMessage] });
  },
};
