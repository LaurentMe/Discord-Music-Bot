module.exports = {
    name: 'skip',
    description: 'Skip song',
    execute(message, args, client, distube) {
        distube.skip(message)
    }
}
