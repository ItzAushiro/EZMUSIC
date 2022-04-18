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
  name: "volume",
  aliases: ["v"],
  description: "Modifier le volume",
  cooldown: 5,
  edesc: `Tapez la commande pour modifier le volume de la chanson en cours.\nUtilisation : ${PREFIX}volume <0-200>`,

execute(message, args) {
    //if not a guild return
    if(!message.guild) return;
    //react with approve emoji
    message.react(approveemoji);
    //get the current queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message,`Il n'y a aucune musique en cours`);
    //if not in the same voice channel as the Bot return 
    if (!canModifyQueue(message.member)) return;
    //define Info Embed
    const volinfoembed = new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`🔊 Le volume est: \`${queue.volume}%\``)
    //if no args return info embed   			 
    if (!args[0]) return message.channel.send(volinfoembed).catch(console.error);
    //if args is not a number return error
    if (isNaN(args[0])) return attentionembed(message,"Ce n'est pas un nombre entre **0 et 200**");
    //if args is not a Number between 150 and 0 return error
    if (parseInt(args[0]) < 0 || parseInt(args[0]) > 200)
      return attentionembed(message,"Ce n'est pas un nombre entre **0 et 200**");
    //set queue volume to args
    queue.volume = args[0];
    //set current volume to the wanted volume
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    //define approve embed
    const volinfosetembed = new MessageEmbed()   
    .setColor("RED")
    .setTitle(`🔊 Le volume est passé à: \`${args[0]}%\`!`)  
    //Send approve message
    return queue.textChannel.send(volinfosetembed).catch(console.error);
  }
};
