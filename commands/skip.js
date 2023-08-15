module.exports = {
    name: 'skip',
    description: 'Skip song',
    execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        if (queue.songs.length > 1) {
            distube.skip(message);
        } else {
            queue.stop();
            return message.channel.send('No songs left in queue.');
        }
    },
};
