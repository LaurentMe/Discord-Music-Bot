module.exports = {
  name: "pause",
  description: "Pause a song",
  execute(message, args, client, distube) {
    try {
      distube.pause(message);
      message.channel.send('', {files: ['./../assets/img/Pause.png']});
    } catch (e) {
      message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
    }
  },
};
