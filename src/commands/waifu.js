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
            .addChoice("waifu", "waifu")
            .addChoice("neko", "neko")
            .addChoice("shinobu", "shinobu")
            .addChoice("megumin", "megumin")
            .addChoice("bully", "bully")
            .addChoice("cuddle", "cuddle")
            .addChoice("cry", "cry")
            .addChoice("hug", "hug")
            .addChoice("awoo", "awoo")
            .addChoice("kiss", "kiss")
            .addChoice("lick", "lick")
            .addChoice("pat", "pat")
            .addChoice("smug", "smug")
            .addChoice("bonk", "bonk")
            .addChoice("yeet", "yeet")
            .addChoice("blush", "blush")
            .addChoice("smile", "smile")
            .addChoice("wave", "wave")
            .addChoice("highfive", "highfive")
            .addChoice("handhold", "handhold")
            .addChoice("nom", "nom")
            .addChoice("bite", "bite")
            .addChoice("glomp", "glomp")
            .addChoice("slap", "slap")
            .addChoice("kill", "kill")
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
            .addChoice("waifu", "waifu")
            .addChoice("neko", "neko")
            .addChoice("bj", "blowjob")
            .addChoice("trap", "trap")
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
