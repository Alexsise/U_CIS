const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("node:path");

module.exports = {
  name: "guildMemberRemove",
  async execute(client, member) {
    const date = new Date().toString();

    const configFilePath = path.resolve(__dirname, "../../config.json");
    const configFile = fs.readFileSync(configFilePath);
    let config = JSON.parse(configFile);
    config = config.Channels;

    const logChannel = await member.guild.channels.cache.find(
      (channel) => channel.id === config["guildMemberRemove"]
    );

    who = member.bot ? "Bot" : "User";

    const embedMessage = new MessageEmbed()
      .setAuthor({
        name: `${member.user.tag}`,
        iconURL: `${member.user.avatarURL()}`,
      })
      .setTitle("Member left a guild.")
      .setDescription(date)
      .setColor("#000000")
      .addFields(
        { name: `${who} tag`, value: member.user.tag, inline: true },
        { name: `${who} id`, value: member.id, inline: true },
        {
          name: `${who} creation date`,
          value: member.user.createdAt.toString(),
        }
      );

    return logChannel.send({ embeds: [embedMessage] });
  },
};
