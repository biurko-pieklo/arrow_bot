const { Events, Collection } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command to match ${interaction.commandName} found.`);
            return;
        }

        const { cooldowns } = interaction.client;

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownDuration = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownDuration;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);

                return interaction.reply({
                    content: `You are too fast. You can use that command again in ${expiredTimestamp} seconds.`,
                    ephemeral: true,
                });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => {
           timestamps.delete(interaction.user.id); 
        }, cooldownDuration);

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'An error ocurred while executing this command...',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'An error ocurred while executing this command...',
                    ephemeral: true
                });
            }
        }

        console.log(interaction);
    }
}
