module.exports = {
  name: "play",
  description: "Play a song",
  execute(message, args, client, distube) {
    try {
      if (args.length > 0) {
        distube.play(message, args.join(" "));
      } else {
        distube.resume(message);
      }
    } catch (e) {
      message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
    }
  },
};
