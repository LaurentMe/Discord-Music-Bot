module.exports = {
    name: 'pause',
    description: 'Pause a song',
    execute(message, args, client, distube) {
        distube.pause(message, args.join(' '))
    }
}
