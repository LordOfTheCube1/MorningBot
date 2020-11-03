/* 
 COPYRIGHT (C) 2020 LordOfTheCube and Komali
 Licensed under GNU General Public License v3.0 (more details in "LICENSE" file)
*/

const { MessageEmbed } = require("discord.js");
const uniqid = require("uniqid");
exports.run = async (client, msg, args) => {
  if(!( require( '../checks/modcheck.js' )( client, msg ) )) return;
  if(!msg.mentions.users.first()) return;
  const reason = args.splice(1).join(" ");
  const id = uniqid.process();
  const punishment = {
    type: "warn",
    id: id,
    user: msg.mentions.users.first().id,
    moderator: msg.author.id,
    reason: reason,
    time: new Date(),
  }
  const embed = new MessageEmbed()
  .setColor("YELLOW")
  .setDescription("New Warning")
  .addField("User", `<@${punishment.user}>`, true)
  .addField("Reason", reason, true)
  .addField("ID", id, true)
  .setTimestamp()
  .setFooter("Moderator: Hidden");
  client.punishments.set(id, punishment).then(() => {
    msg.channel.send(embed);
    client.cache.set(id, punishment);
  });
}