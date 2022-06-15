const { SlashCommandBuilder } = require("@discordjs/builders");
const { ChannelType } = require("discord-api-types/v10");
const fs = require("fs");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log")
    .setDescription("Select log event and choose in which channel send it.")
    .addStringOption((option) =>
      option
        .setName("log")
        .setDescription("Choose a log event to work with")
        .setRequired(true)
        .addChoices(
          { name: "channelCreate", value: "channelCreate" },
          { name: "channelDelete", value: "channelDelete" },
          { name: "emojiCreate", value: "emojiCreate" },
          { name: "emojiDelete", value: "emojiDelete" },
          { name: "guildBanAdd", value: "guildBanAdd" },
          { name: "guildBanRemove", value: "guildBanRemove" },
          { name: "guildMemberAdd", value: "guildMemberAdd" },
          { name: "guildMemberRemove", value: "guildMemberRemove" },
          { name: "guildMemberUpdate", value: "guildMemberUpdate" },
          { name: "messageCreate", value: "messageCreate" },
          { name: "messageDelete", value: "messageDelete" },
          { name: "messageUpdate", value: "messageUpdate" }
        )
    )
    .addChannelOption((option) =>
      option
        .setName("channel-log")
        .setDescription("Channel to send log")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  async execute(interaction) {
    if (
      !(
        interaction.user.id == "369534614584295425" ||
        interaction.user.id == "290394430437851137" ||
        interaction.user.id == "309736120856477707"
      )
    ) {
      return interaction.reply("Пошел нахуй");
    }

    const logChannel = interaction.options.getChannel("channel-log");
    const log = interaction.options.getString("log");

    const configFilePath = path.resolve(__dirname, "../../config.json");
    const configFile = fs.readFileSync(configFilePath);
    let config = JSON.parse(configFile);

    Object.entries(config.Channels).forEach(([key, value]) => {
      if (key === log) {
        config.Channels[key] = logChannel.id;
      }
    });

    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    await interaction.reply(
      `Event "${log}" will be sent to ${logChannel} from now on`
    );
  },
};
