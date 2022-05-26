const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stat")
    .setDescription("Последние слова, адресованные Стату, на этом сервере")
    .addUserOption((option) =>
      option.setName("target").setDescription("Послать эту цель")
    ),
  async execute(interaction) {
    if (interaction.options.getUser("target"))
      await interaction.reply(
        `<@${interaction.options.getUser("target").id}>, пошел нахуй!`
      );
    else {
      const id = interaction.member.id;
      await interaction.reply(`<@${id}>, пошел нахуй!`);
    }
  },
};
