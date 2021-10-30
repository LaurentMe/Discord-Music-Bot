const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json')

const { Client, Intents } = require('discord.js');
const DisTube = require('distube');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
const distube = new DisTube.default(client);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));


for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot is online')

    distube.on('error', (channel, error) => {
        console.error(error)
        channel.send(`An error encoutered: ${error.slice(0, 1979)}`) // Discord limits 2000 characters in a message
    });
});

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'play':
            client.commands.get('play').execute(message, args, client, distube);
            break;
        case 'pause':
            client.commands.get('pause').execute(message, args, client, distube);
            break;
        default:
            message.channel.send('Unrecognizable command');
            break;
    }
});

client.login(token);
