module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) console.log("Button");

    await command.execute(interaction).catch((error) => {
      console.error(error);
      interaction.reply({
        content: "There was an unexpected error while executing the command",
        ephemeral: true,
      });
    });
  },
};
