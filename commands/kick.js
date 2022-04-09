const {SlashCommandBuilder} = require('@discordjs/builders');
const { Message, Guild } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kickhim')
    .setDescription('Kick a specified user')
    .addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Ban reason')),
    
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const guild = interaction.guild;
        const reason = interaction.options.getString('reason') ?? "Unknown";

        guild.members.kick(user, reason);
        return interaction.reply(`${user.username} was kicked due to ${reason}`);
    }
}