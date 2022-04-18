const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

const db = require('quick.db');


module.exports = {
  name: `prefix`,
  description: `Définit un prefix spécifique au serveur`,
  aliases: ["setprefix"],
  cooldown: 5,
  edesc: `Tapez cette commande pour définir un préfixe spécifique au serveur ! Utilisation : ${PREFIX}prEfix <NOUVEAU PREFIX>`,
 async execute(message, args, client) {

    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = PREFIX;

    //react with approve emoji
    message.react("✅");

    if(!args[0]) return message.channel.send(new MessageEmbed()
    .setColor("RED")
    .setTitle(`Prefix actuel: \`${prefix}\``)
    .setFooter('Veuillez fournir un nouveau prefix')
    );
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new MessageEmbed()
    .setColor("RED")
    .setTitle(`🚫 Vous n'avez pas la permission pour cette commande !`)
    );

    if(args[1]) return message.channel.send(new MessageEmbed()
    .setColor("RED")
    .setTitle(`'❗Le prefix ne peut pas avoir deux espaces'`));

    db.set(`prefix_${message.guild.id}`, args[0])

    message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`✅ Le nouveau prefix a été défini avec succès **\`${args[0]}\`**`))
  }
}