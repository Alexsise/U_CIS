const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kobolt")
    .setDescription("Задай кобольту главный вопрос в его жизни"),
  async execute(interaction) {
    await interaction.reply("<@284682068183744512>");
    await interaction.followUp("Где мои 5 баксов?");
  },
};
