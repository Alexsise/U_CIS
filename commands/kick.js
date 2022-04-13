const {SlashCommandBuilder} = require('@discordjs/builders');
const { Message, Guild } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a specified user')
    .addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Ban reason')),
    
    async execute(interaction) {
        try {
            const guild = interaction.guild;
            const target = await guild.members.fetch(interaction.options.getUser('target'));
            const user = await guild.members.fetch(interaction.user);
            const reason = interaction.options.getString('reason') ?? "not specified reason";

            if (!user.permissions.has('KICK_MEMBERS', true)) 
            return interaction.reply('You don\'t have permissions to kick members.');

            if (!target.kickable)
            return interaction.reply('The target cannot be kicked.');

            guild.members.kick(target, reason);
            return interaction.reply(`${target.username} was kicked due to ${reason}`);
        }
        catch (error){
            console.log(error);
            return interaction.reply('Kick issue.');
        } 
    }
}