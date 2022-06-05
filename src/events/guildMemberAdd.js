// const { MessageEmbed } = require("discord.js");

// module.exports = {
//   name: "guildMemberAdd",
//   async execute(client, member) {
//     const date = new Date().toString();
//     const logChannel = member.guild.channels.cache.find(
//       (channel) => channel.name === "log"
//     );
//     who = member.bot ? "Bot" : "User";

//     const embedMessage = new MessageEmbed()
//       .setAuthor({
//         name: `${member.user.tag}`,
//         iconURL: `${member.user.avatarURL()}`,
//       })
//       .setTitle("New member arrived.")
//       .setDescription(date)
//       .setColor("#000000")
//       .addFields(
//         { name: `${who} tag`, value: member.user.tag, inline: true },
//         { name: `${who} id`, value: member.id, inline: true },
//         {
//           name: `${who} creation date`,
//           value: member.user.createdAt.toString(),
//         }
//       );

//     await logChannel.send({ embeds: [embedMessage] });
//   },
// };
