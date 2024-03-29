module.exports = {
    name: 'pause',
    aliases: ['pause', 'hold'],
    inVoiceChannel: true,
    execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
        if (queue.paused) {
            queue.resume();
            return message.channel.send('Resumed the song for you :)');
        }
        queue.pause();
        message.channel.send('Paused the song for you :)');
    },
};
