const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data:new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a specified user')
        .addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason to ban').setRequired(false)),

        async execute(interaction) {
            try {
                const guild = interaction.guild;
                const target = await guild.members.fetch(interaction.options.getUser('target'));
                const user = await guild.members.fetch(interaction.user);
                const reason = interaction.options.getString('reason') ?? "not specified reason";
            
            
                if (!user.permissions.has('BAN_MEMBERS', true)) 
                return interaction.reply('You don\'t have permissions to ban members.');

                if (!target.bannable)
                    return interaction.reply('The target cannot be banned.');
            
                guild.members.ban(target, {reason})
                return interaction.reply(`${target.username} was banned due to ${reason}.`);
            }
            catch (error){
                console.log(error);
                return interaction.reply('Ban issue.');
            }
        }
}