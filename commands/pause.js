module.exports = {
    name: 'pause',
    description: 'Pause a song',
    execute(message, args, client, distube) {
        try {
            distube.pause(message)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
        }
    }
}
