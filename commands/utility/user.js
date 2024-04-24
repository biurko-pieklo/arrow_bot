const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('User info'),
    async execute(interaction) {
        await interaction.reply(`${interaction.user.username} joined on ${interaction.member.joinedAt}`);
    },
};
