module.exports = {
    name: 'pause',
    description: 'Play a song',
    execute(message, args, client, distube) {
        distube.pause(message, args.join(' '))
    }
}
