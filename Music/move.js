require('array.prototype.move');
const { canModifyQueue } = require("../util/nkm");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "Déplacer les chansons dans la file d'attente.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Il n'y a pas de file d'attente.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Usage: ${message.client.prefix}move <Numéro de file d'attente>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}move <Numéro de file d'attente>`);

    let songMoved = queue.songs[args[0] - 1];

    queue.songs.move(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} 🚚 déplacée **${songMoved.title}**.`);
  }
};