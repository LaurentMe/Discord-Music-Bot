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

// Queue status template
const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ')
    || 'Off'}\` | Loop: \`${
        queue.repeatMode
            ? queue.repeatMode === 2
                ? 'All Queue'
                : 'This Song'
            : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

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
        case 'skip':
            client.commands.get('skip').execute(message, args, client, distube);
            break;
        default:
            message.channel.send('Unrecognizable command');
            break;
    }
});

// DisTube event listeners, more in the documentation page
distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send(
            `Playing \`${song.name}\` - \`${
                song.formattedDuration
            }\`\nRequested by: ${song.user}\n${status(queue)}`,
        ))
    .on('addSong', (queue, song) =>
        queue.textChannel.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        ))
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(
            `Added \`${playlist.name}\` playlist (${
                playlist.songs.length
            } songs) to queue\n${status(queue)}`,
        ))
    // DisTubeOptions.searchSongs = true
    .on('searchResult', (message, result) => {
        let i = 0
        message.channel.send(
            `**Choose an option from below**\n${result
                .map(
                    song =>
                        `**${++i}**. ${song.name} - \`${
                            song.formattedDuration
                        }\``,
                )
                .join(
                    '\n',
                )}\n*Enter anything else or wait 30 seconds to cancel*`,
        )
    })
    // DisTubeOptions.searchSongs = true
    .on('searchCancel', message => message.channel.send(`Searching canceled`))
    .on('searchInvalidAnswer', message =>
        message.channel.send(`searchInvalidAnswer`))
    .on('searchNoResult', message => message.channel.send(`No result found!`))
    .on('error', (textChannel, e) => {
        console.error(e)
        textChannel.send(`An error encountered: ${e.slice(0, 2000)}`)
    })
    .on('finish', queue => queue.textChannel.send('Finish queue!'))
    .on('finishSong', queue => queue.textChannel.send('Finish song!'))
    .on('disconnect', queue => queue.textChannel.send('Disconnected!'))
    .on('empty', queue => queue.textChannel.send('Empty!'))

client.login(token);
