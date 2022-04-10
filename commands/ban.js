const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data:new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a specified user')
        .addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason to ban').setRequired(false)),

        async execute(interaction) {
            const target = interaction.options.getUser('target');
            const guild = interaction.guild;
            const reason = interaction.options.getString('reason') ?? "Not specified reason";
            guild.members.ban(target, {reason});
            return interaction.reply(`${target.username} was banned due to ${reason}`)
        }
}