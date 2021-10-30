module.exports = {
    name: 'ping',
    description: 'Testping',
    execute(message, args) {
        message.channel.send('pong');
    }
}
