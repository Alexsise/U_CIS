const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kickhim')
    .setDescription('Kick a specified user')
    .addUserOption(target => target.setName('targer').setDescription('The member to kick'))
    .addStringOption(reason => reason.setName('reason').setDescription('Ban reason')),
    
    async execute(interaction) {
        const user = interaction.options.user.getMember('target');
        user.kick('Мудак');
        return interaction.reply(`${user.username} was kicked due to ${reason}`);
    }
}