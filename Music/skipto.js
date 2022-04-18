////////////////////////////
////////CONFIG LOAD/////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { approveemoji, denyemoji, PREFIX, } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "skipto",
  aliases: ["st", "jump"],
  description: "Passer au numéro de file d'attente sélectionné",
  cooldown: 5,
  edesc: `Tapez la commande pour passer un nombre spécifique de chansons à la chanson souhaitée.\nUtilisation : ${PREFIX}skipto`,

execute(message, args) {
    //if not in a guild return
    if (!message.guild) return;
    //react with approve
    message.react(approveemoji).catch(console.error);
    //if no args return error
    if (!args.length)
      return attentionembed(message, `Essayer: ${message.client.prefix}${module.exports.name} <Numéro de file d'attente>`)
    //if not a number return error
    if (isNaN(args[0]))
      return attentionembed(message, `Essayer: ${message.client.prefix}${module.exports.name} <Numéro de file d'attente>`)
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no Queue return error
    if (!queue) return attentionembed(message, "Il n'y a pas de file d'attente");
    //if member not in the same voice channel as the Bot return
    if (!canModifyQueue(message.member)) return;
    //if args bigger then the Server Queue return error
    if (args[0] > queue.songs.length)
      return attentionembed(message, `La file d'attente ne dure que ${queue.songs.length} !`);
    //set playing to true
    queue.playing = true;
    //if the queue is loop 
    if (queue.loop) {
      //make a loop for all songs to skip and add them at the end again
      for (let i = 0; i < args[0] - 1; i++) 
        queue.songs.push(queue.songs.shift());
    //if not a loop
    } else {
      //remove all songs including the args 
      queue.songs = queue.songs.slice(args[0] - 1);
    }
    //end current song
    queue.connection.dispatcher.end();
    //Send approve
    queue.textChannel.send(
      new MessageEmbed()
        .setColor("RED")
        .setAuthor(`${message.author.username}#${message.author.discriminator} ${args[0]} chansons ignorées`, "https://1.bp.blogspot.com/-D-e3wLzsOe8/Xv43-XMvYdI/AAAAAAAAHoM/QsKCxztzUzQ649pt-lWAg7STTlsgqxL4QCK4BGAsYHg/d/apple-music-note.jpg")
    ).catch(console.error);
  }
};
