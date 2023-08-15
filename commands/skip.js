module.exports = {
    name: 'skip',
    description: 'Skip song',
    execute(message, args, client, distube) {
        if (distube.queues.collection.size > 0) {
            try {
                distube.skip(message);
            } catch (e) {
                try {
                    distube.stop();
                    return message.channel.send('No songs left in queue.');
                } catch (e) {
                    message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
                }
            }
        }
    },
};
