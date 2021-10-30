const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json')

const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));


for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => console.log('Bot is online'));

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'play':
            client.commands.get('play').execute(message, args, client);
            break;
        default:
            message.channel.send('Unrecognizable command');
            break;
    }
});

client.login(token);
