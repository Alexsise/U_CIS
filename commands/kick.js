const {SlashCommandBuilder} = require('@discordjs/builders');
const { Message, Guild } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a specified user')
    .addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Ban reason')),
    
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const guild = interaction.guild;
        const reason = interaction.options.getString('reason') ?? "Not specified reason";
        guild.members.kick(target, reason);
        return interaction.reply(`${target.username} was kicked due to ${reason}`);
    }
}