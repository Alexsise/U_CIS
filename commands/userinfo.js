const {SlashCommandBuilder} = require('@discordjs/builders');
const { ThreadManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Display spicified user`s info')
        .addUserOption(target => target.setName('target').setDescription('Specify user')),
        async execute(interaction) {
            const target = interaction.options.getUser('target');
            return interaction.reply({content:`User tag: ${target.user.tag}\n` +
                                              `User id: ${target.user.id}` +
                                              `User creation date: ${target.user.createdAt.toLocaleDateString()}`})
        }
}