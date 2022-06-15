const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Get a anime gif or picture")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("sfw")
        .setDescription("Choose from safe for work tags")
        .addStringOption((option) =>
          option
            .setName("category")
            .setDescription("Choose category")
            .setRequired(true)
            .addChoices(
              { name: "waifu", value: "waifu" },
              { name: "neko", value: "neko" },
              { name: "shinobu", value: "shinobu" },
              { name: "megumin", value: "megumin" },
              { name: "bully", value: "bully" },
              { name: "cuddle", value: "cuddle" },
              { name: "cry", value: "cry" },
              { name: "hug", value: "hug" },
              { name: "awoo", value: "awoo" },
              { name: "kiss", value: "kiss" },
              { name: "lick", value: "lick" },
              { name: "pat", value: "pat" },
              { name: "smug", value: "smug" },
              { name: "bonk", value: "bonk" },
              { name: "yeet", value: "yeet" },
              { name: "blush", value: "blush" },
              { name: "smile", value: "smile" },
              { name: "wave", value: "wave" },
              { name: "highfive", value: "highfive" },
              { name: "handhold", value: "handhold" },
              { name: "nom", value: "nom" },
              { name: "bite", value: "bite" },
              { name: "glomp", value: "glomp" },
              { name: "slap", value: "slap" },
              { name: "kill", value: "kill" }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("nsfw")
        .setDescription("Choose from not safe for work tags")
        .addStringOption((option) =>
          option
            .setName("category")
            .setDescription("Choose category")
            .setRequired(true)
            .addChoices(
              { name: "waifu", value: "waifu" },
              { name: "neko", value: "neko" },
              { name: "bj", value: "blowjob" },
              { name: "trap", value: "trap" }
            )
        )
    ),
  async execute(interaction) {
    const type = interaction.options.getSubcommand().toString();
    const category = interaction.options.getString("category");
    const url = `https://api.waifu.pics/${type}/${category}`;

    const ful = await axios.get(url);

    const ephemeral = type === "nsfw" ? true : false;

    await interaction.reply({ content: ful.data.url, ephemeral: ephemeral });
  },
};
