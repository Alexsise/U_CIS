const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, Message } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Bulk deletes messages")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to delete")
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = await interaction.options.get("amount");
    const channel = interaction.channel;

    const yesButton = new MessageButton()
      .setCustomId("yesBulkDelete")
      .setLabel("Yes")
      .setStyle("SUCCESS");

    const noButton = new MessageButton()
      .setCustomId("noBulkDelete")
      .setLabel("No")
      .setStyle("DANGER");

    actionRow = new MessageActionRow().addComponents(yesButton, noButton);

    interaction.reply({
      content:
        `Are you sure you want to clean **${amount.value}** messages in this channel?\n` +
        `**(This action cannot be undone)**`,
      components: [actionRow],
    });


    const messages = await channel.messages.fetch();
    const botMsg = messages.filter((msg) => msg.author.id === "938519031302983680")

    const filter = (click) =>
      (click.user.id =
        interaction.member.id &&
        (click.customId === "yesBulkDelete" ||
          click.customId === "noBulkDelete"));

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 10000,
      max: 1,
    });

    collector.on("collect", (interaction) => {
      if (interaction.customId === "yesBulkDelete") {
        channel.bulkDelete(amount.value, true);
      }
      if (interaction.customId === "noBulkDelete") {
        channel.bulkDelete(1, true)
      }
    });
  },
};
