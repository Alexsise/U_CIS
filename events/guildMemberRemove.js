const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(client, member) {
    const date = new Date().toString();
    const channel = client.channels.cache.get("963791132196761620");
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

    await channel.send({ embeds: [embedMessage] });
  },
};
