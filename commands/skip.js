module.exports = {
    name: 'skip',
    description: 'Skip song',
    execute(message, args, client, distube) {
        try {
            distube.skip(message);
        } catch (e) {
            distube.stop()
        }
    }
}
