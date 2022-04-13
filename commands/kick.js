const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a specified user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Ban reason")
    ),

  async execute(interaction) {
    try {
      const guild = interaction.guild;
      const target = interaction.options.getUser("target");
      const target_guild = await guild.members.fetch(target);
      const user = await guild.members.fetch(interaction.user);
      const reason =
        interaction.options.getString("reason") ?? "not specified reason";

      if (!user.permissions.has("KICK_MEMBERS", true))
        return await interaction.reply({
          content: "You don't have permissions to kick members.",
          ephemeral: true,
        });

      if (!target_guild.kickable)
        return await interaction.reply({
          content: "This target cannot be kicked.",
          ephemeral: true,
        });

      guild.members.kick(target_guild, reason);
      return await interaction.reply(
        `${target.username} was kicked due to ${reason}`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply({ content: "Kick issue.", ephemeral: true });
    }
  },
};
