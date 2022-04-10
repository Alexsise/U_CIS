const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with the server info!'),
    async execute(interaction) {
        return interaction.reply(`Server: ${interaction.guild.name}\n` +
                                 `Total Members: ${interaction.guild.memberCount}`);
    }
}