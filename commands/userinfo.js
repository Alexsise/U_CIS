const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Display spicified user`s info")
    .addUserOption((option) =>
      option.setName("target").setDescription("Specify user").setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("target");
    who = user.bot ? "Bot" : "User";
    return interaction.reply({
      content:
        `${who} tag: ${user.tag}\n` +
        `${who} id: ${user.id}\n` +
        `${who} creation date: ${user.createdAt.toLocaleDateString()}`,
      ephemeral: true,
    });
  },
};
