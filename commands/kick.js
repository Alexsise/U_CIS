const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a specified user')
    .addUserOption(target => target.setName('targer').setDescription('The member to kick'))
    .addStringOption(reason => reason.setName('reason').setDescription('Ban reason')),
    async execute(interaction) {
        const target = interaction.option.getUser('target');
        target.kick('Мудак');
        return interaction.reply(`${target} was kicked due to ${reason}`);
    }
}