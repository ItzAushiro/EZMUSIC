module.exports = { 
    name: "leave", 
    description: "Quitter la chaîne actuelle", 
    execute(message) {
         const { channel } = message.member.voice; 
         const serverQueue = message.client.queue.get(message.guild.id); 
         if (!channel) return message.reply("Vous devez d'abord rejoindre un canal vocal!").catch(console.error); 
         if (!message.guild.me.voice.channel) return message.reply("I am not in a voice channel!").catch(console.error); 
         if (channel.id !== message.guild.me.voice.channel.id) return message.reply("je ne suis pas dans ton canal vocal").catch(console.error); 
         if(serverQueue) { 
             serverQueue.connection.dispatcher.destroy(); 
             channel.leave(); 
             message.client.queue.delete(message.guild.id); 
             serverQueue.textChannel.send('Je viens de quitter le canal. À la prochaine.👋').catch(console.error); 
             return 
            }
            channel.leave(); 
            
    message.client.queue.delete(message.guild.id); 
    message.channel.send('Je viens de quitter le canal. À la prochaine.👋').catch(console.error); } };