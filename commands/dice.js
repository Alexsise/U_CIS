const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Throws a dice and choose random number'),
        
    async execute(interaction) {
        await interaction.reply(`Your number is ${(Math.floor(Math.random() * 5) + 1).toString()}!`);
    }
}