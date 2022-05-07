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
        .setDescription("Display current server info.")
    ),
  async execute(client, interaction) {
    switch (interaction.options.getSubcommand()) {
      case "user": {
        const user = interaction.options.getUser("target");
        who = user.bot ? "Bot" : "User";
        return interaction.reply({
          content:
            `${who} tag: ${user.tag}\n` +
            `${who} id: ${user.id}\n` +
            `${who} creation date: ${user.createdAt.toLocaleString()}`,
          ephemeral: true,
        });
      }
      case "server":
        return interaction.reply({
          content:
            `Server: ${interaction.guild.name}\n` +
            `Total Members: ${interaction.guild.memberCount}`,
          ephemeral: true,
        });
    }
  },
};
