////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { approveemoji, denyemoji, PREFIX, } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "skip",
  aliases: ["se"],
  description: "Ignorer la chanson en cours de lecture",
  cooldown: 5,
  edesc: `Tapez la commande pour passer à la chanson en cours d'écoute.\nUtilisation : ${PREFIX}skip`,

execute(message) {
    //if not in a guild retunr
    if (!message.guild) return;
    //react with approve emoji
    message.react(approveemoji).catch(console.error);
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no Queue return error
    if (!queue)
      return attentionembed(message, "Il n'y a rien que vous pouvez sauter!").catch(console.error);
    //if not in the same channel return
    if (!canModifyQueue(message.member)) return;
    //set playing to true 
    queue.playing = true;
    //end current song
    queue.connection.dispatcher.end();
    //send approve message
    queue.textChannel.send(
      new MessageEmbed().setColor("RED").setAuthor(`${message.author.username} sauté la chanson.`, "https://1.bp.blogspot.com/-D-e3wLzsOe8/Xv43-XMvYdI/AAAAAAAAHoM/QsKCxztzUzQ649pt-lWAg7STTlsgqxL4QCK4BGAsYHg/d/apple-music-note.jpg")
    ).catch(console.error);
  }
};
