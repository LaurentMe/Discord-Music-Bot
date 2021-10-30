const DisTube = require('distube');


module.exports = {
    name: 'play',
    description: 'Play a song',
    execute(message, args, client) {
        const distube = new DisTube.default(client)
        distube.play(message, args.join(' '))
    }
}
