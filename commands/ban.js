const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a specified user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason to ban")
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      if (!interaction.inGuild()) return interaction.reply("This command cannot be used in direct messages.")
      const guild = interaction.guild;
      const target = interaction.options.getUser("target");
      const target_guild = await guild.members.fetch(target);
      const user = await guild.members.fetch(interaction.user);
      const reason =
        interaction.options.getString("reason") ?? "not specified reason";

      if (!user.permissions.has("BAN_MEMBERS", true))
        return interaction.reply({
          content: "You don't have permissions to ban members.",
          ephemeral: true,
        });

      if (!target_guild.bannable)
        return interaction.reply({
          content: "This target cannot be banned.",
          ephemeral: true,
        });

      guild.members.ban(target_guild, { reason });
      return interaction.reply(
        `${target.username} was banned due to ${reason}.`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Ban issue.");
    }
  },
};
