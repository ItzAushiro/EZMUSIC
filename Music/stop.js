////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { approveemoji,  denyemoji,  PREFIX,} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "stop",
  description: "Arrête la musique",
  aliases: ["leave", "end"],
  cooldown: 5,
  edesc: `Tapez la commande pour arrêter la lecture et quitter la chaîne.\nUtilisation : ${PREFIX}stop`,

async execute(message,args,client) {
  //if not in a guild retunr
  if (!message.guild) return;
  //react with approve emoji
  message.react(approveemoji).catch(console.error);
  const { channel } = message.member.voice;
  //get the serverQueue
  const queue = message.client.queue.get(message.guild.id);
  //if not a valid channel
  if (!channel) return attentionembed(message, "Veuillez d'abord rejoindre un canal vocal");  
  //If not in the same channel return error
  if (queue && channel !== message.guild.me.voice.channel)
  return attentionembed(message, `Vous devez être dans le même canal vocal que moi`);
  //if no Queue return error
  if (!queue)
    return attentionembed(message, "**Il n'y a rien que vous puissiez arrêter !**");
  //if not in the same channel return
  if (!canModifyQueue(message.member)) return;
  //Leave the channel
  await channel.leave();
  //send the approve message    
  message.channel.send(new MessageEmbed()
  .setColor("RED")
  .setAuthor(`${message.author.username} a arrêté la musique!`, "https://1.bp.blogspot.com/-D-e3wLzsOe8/Xv43-XMvYdI/AAAAAAAAHoM/QsKCxztzUzQ649pt-lWAg7STTlsgqxL4QCK4BGAsYHg/d/apple-music-note.jpg"))
  .catch(console.error);
  }
};
