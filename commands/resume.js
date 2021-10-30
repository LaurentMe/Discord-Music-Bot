module.exports = {
    name: 'resume',
    description: 'Resume a song',
    execute(message, args, client, distube) {
        distube.resume(message)
    }
}
