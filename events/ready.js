const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Client ${readyClient.user.tag} is ready to rock!`);
    }
}
