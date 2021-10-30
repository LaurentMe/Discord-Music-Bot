module.exports = {
    name: 'play',
    description: 'Play a song',
    execute(message, args, client, distube) {
        if (args.length > 0) {
            try {
                distube.play(message, args.join(' '))
            } catch (e) {
                message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
            }
            return
        }
        try {
            distube.resume(message);
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
        }
    }
}
