const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Display the information about user or server.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Display specified user`s info.")
        .addUserOption((option) =>
          option.setName("target").setDescription("target").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Displays server`s info")
    ),

  async execute(interaction) {
    if (!interaction.inGuild()) await interaction.reply("This command cannot be used in direct messages.")

    switch (interaction.options.getSubcommand()) {
      case "user": {
        const user = interaction.options.getUser("target");
        who = user.bot ? "Bot" : "User";
        await interaction.reply({
          content:
            `${who} tag: ${user.tag}\n` +
            `${who} id: ${user.id}\n` +
            `${who} creation date: ${user.createdAt.toLocaleString()}`,
          ephemeral: true,
        });
        break;
      }
      case "server":
        await interaction.reply({
          content:
            `Server: ${interaction.guild.name}\n` +
            `Server id: ${interaction.guild.id}\n` +
            `Total Members: ${interaction.guild.memberCount}`,
          ephemeral: true,
        });
        break;
    }
  },
};
