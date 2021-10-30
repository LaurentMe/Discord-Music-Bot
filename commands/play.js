module.exports = {
    name: 'play',
    description: 'Play a song',
    execute(message, args, client, distube) {
        if (args.length > 0) {
            distube.play(message, args.join(' '))
            return
        }
        distube.resume(message);
    }
}
