const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Client ${readyClient.user.tag} is ready to rock!`);
});

client.login(token);
