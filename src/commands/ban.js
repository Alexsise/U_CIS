const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a specified user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Target to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Ban reason")
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      if (!interaction.inGuild())
        return interaction.reply(
          "This command cannot be used in direct messages."
        );
      const guild = interaction.guild;
      const target = interaction.options.getUser("target");
      const target_guild = await guild.members.fetch(target);
      const user = await guild.members.fetch(interaction.user);
      const reason =
        interaction.options.getString("reason") ?? "not specified reason";

      if (!user.permissions.has("BAN_MEMBERS", true))
        await interaction.reply({
          content: "You don't have permissions to ban members.",
          ephemeral: true,
        });

      if (!target_guild.bannable)
        await interaction.reply({
          content: "This target cannot be banned.",
          ephemeral: true,
        });

      guild.members.ban(target_guild, { reason });
      await interaction.reply(
        `${target.username} was banned due to ${reason}.`
      );
    } catch (error) {
      console.log(error);
      await interaction.reply("Ban issue.");
    }
  },
};
