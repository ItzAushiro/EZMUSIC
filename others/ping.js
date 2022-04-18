const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

module.exports = {
  name: `ping`,
  description: `Vous donne le ping du Bot`,
  aliases: ["latency"],
  cooldown: 2,
  edesc: "Tapez cette commande pour voir à quelle vitesse le Bot peut répondre à vos entrées de messages/commandes !",
  execute(message, args, client) {
    //react with approve emoji
    message.react("✅");
    //send the Ping embed
    message.reply(new MessageEmbed().setColor("RED").setTitle(":ping_pong: `" + client.ws.ping + "ms`"));
  }
}