const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Welcomes the user'),
    async execute(interaction) {
        await interaction.reply('Hi, how are you?');
    },
};
