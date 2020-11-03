/* 
 COPYRIGHT (C) 2020 LordOfTheCube and Komali
 Licensed under GNU General Public License v3.0 (more details in "LICENSE" file)
*/

const { MessageEmbed } = require('discord.js');

exports.run = async(client, msg, args) => {
 if(msg.mentions.users.first() && require('../checks/modcheck.js')(client, msg)) {
   const user = msg.mentions.users.first();
   const things = client.cache.filter(e => e.user == user.id);
   if(things.size == 0) {
     return msg.channel.send("That user has no warnings <:Pog:738537873388732467>");
   } else {
     let embed = new MessageEmbed()
     .setColor("YELLOW")
     .setTitle(`Infractions for ${user.username}#${user.discriminator}`)
     .setTimestamp();

      if(things.size > 10) return msg.channel.send("That user has too many warnings to display here lmfao");

      things.forEach(s => {
        embed = embed.addField(s.type.charAt(0).toUpperCase() + s.type.slice(1) , `Reason: ${s.reason}\nTime: ${s.time}\nId: ${s.id} `);
      }) 

     return msg.reply(embed);
   }
 } else if(args[0] && require('../checks/modcheck.js')(client, msg)) {
   const thing = client.cache.filter(e => e.id === args[0]);
   if(thing.size == 0) return msg.channel.send("That warning does not exist");

    const warning = thing.first();

    const embed = new MessageEmbed()
    .setTitle(`Warning ${warning.id}`)
    .setColor("YELLOW")
    .setTimestamp(warning.time)
    .addField("Reason", warning.reason, true)
    .addField("Moderator", "<@" + warning.moderator + ">", true);

    return msg.channel.send(embed);
 } else {
    const user = msg.member;
   const things = client.cache.filter(e => e.user == msg.author.id);
   if(things.size == 0) {
     return msg.reply("You have no warnings <:Pog:738537873388732467>");
   } else {
     let embed = new MessageEmbed()
     .setColor("YELLOW")
     .setTitle(`Infractions for ${user.displayName}`)
     .setTimestamp();
      
      if(things.size > 10) return msg.channel.send("That user has too many warnings to display here lmfao");

      things.forEach(s => {
        embed = embed.addField(s.type.charAt(0).toUpperCase() + s.type.slice(1) , `Reason: ${s.reason}\nTime: ${s.time}\nId: ${s.id} `);
      }) 

     return msg.reply(embed);
   }
 }
}