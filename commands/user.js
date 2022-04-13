const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with the user info!"),

  async execute(interaction) {
    const user = interaction.user;
    return interaction.reply({
      content:
        `Your tag: ${user.tag}\n` +
        `Your id: ${user.id}\n` +
        `Account created: ${user.createdAt.toLocaleDateString()}`,
      ephemeral: true,
    });
  },
};
