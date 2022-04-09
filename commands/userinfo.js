const {SlashCommandBuilder} = require('@discordjs/builders');
const { ThreadManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Display spicified user`s info')
        .addUserOption(option => option.setName('target').setDescription('Specify user')),
        async execute(interaction) {
            const user = interaction.options.getUser('target');
            return interaction.reply({content:`User tag: ${user.tag}\n` +
                                              `User id: ${user.id}` +
                                              `User creation date: ${user.createdAt.toLocaleDateString()}`})
        }
}