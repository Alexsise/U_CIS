const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("name")
    .setDescription("Debugging command")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("target")
        .setRequired(true)
    ),
    async execute(interaction) {
        const target = interaction.options.getUser("target");
        const guild = interaction.guild
        const targetGuild = await guild.members.fetch(target);
        await interaction.reply(`Target nickname: ${targetGuild.nickname}\n` +
                                `Target username: ${target.username}`)
    }
};
