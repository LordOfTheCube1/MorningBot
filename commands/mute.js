const uniqid = require('uniqid');
const ms = require('ms');
const { MessageEmbed } = require('discord.js');
exports.run = async(client, msg, args) => {
  msg.delete();
  if(!msg.member.hasPermission("ADMINISTRATOR") && !require('../checks/modcheck.js')(client, msg)) return;

  let user = msg.mentions.users.first();

  try {
    if(!user) user = await client.users.fetch(args[0], false);
  } catch(e) {
    const embed = new MessageEmbed()
    .setDescription("I can't mute someone who doesn't exist?!?!?")
    .setColor('YELLOW');
    return msg.channel.send(embed);
  }

  if(user.id == msg.author.id) {
    const embed = new MessageEmbed()
    .setDescription("Lmao you can't just mute yourself...")
    .setColor("YELLOW")
    .setFooter("I'm not that dumb");

    return msg.channel.send(embed);
  }
  let member;

      try {
          member = await msg.guild.members.fetch(user.id, false);
      } catch(err) {
          const embed = new MessageEmbed()
          .setDescription('This is a valid user, but they\'re not in the server, therefore you can\'t mute them here')
          .setColor("YELLOW");
          return msg.channel.send(embed);
      };
if(msg.member.roles.highest.position <= member.roles.highest.position) {
  const embed = new MessageEmbed()
  .setDescription("You can't just mute another mod")
  .setColor("YELLOW")
  .setFooter("imagine");

  return msg.channel.send(embed);
}
if(!msg.guild.roles.cache.get('769700241556504576')) {
  const embed = new MessageEmbed()
  .setDescription("I can't mute someone if there's no role to mute them with?!?!")
  .setColor("YELLOW")
  .setFooter("lmao");

  return msg.channel.send(embed);
}

const id = uniqid.process('M-');
let reason = args.splice(2).join(" ");
let time = ms(args[1]);

if(!time) reason = args.splice(1).join(" ");

if(!reason) reason = "No reason provided";

if(time) {

  const mute = {
    type: 'mute',
    user: user.id,
    moderator: msg.author.id,
    time: new Date(),
    id: id,
    reason: reason,
    expires: Date.now() + time,
  }

  client.punishments.set(id, mute).then(() => {
    client.cache.set(id, mute);
  });
  const embed = new MessageEmbed()
  .setDescription(`**${member.displayName}** has been muted`)
  .addField("Reason", reason, true)
  .addField("Time", args[1], true)
  .setColor("YELLOW")
  .setFooter("Moderator: hidden")
  .setTimestamp();
  
  member.roles.add(msg.guild.roles.cache.get('769700241556504576'));
  const DM = new MessageEmbed()
  .setDescription(`You were **muted** in ${msg.guild.name}`)
  .addField("Reason", reason, true)
  .addField("Time", args[1], true)
  .setColor("YELLOW")
  .setFooter("Moderator: hidden")
  .setTimestamp();
  user.send(DM);
  return msg.channel.send(embed);
  } else {
    const mute = {
    type: 'mute',
    user: user.id,
    moderator: msg.author.id,
    time: new Date(),
    id: id,
    reason: reason,
  }

  client.punishments.set(id, mute).then(() => {
    client.cache.set(id, mute);
  });
  const embed = new MessageEmbed()
  .setDescription(`**${member.displayName}** has been muted`)
  .addField("Reason", reason, true)
  .addField("Time", "Infinite", true)
  .setColor("YELLOW")
  .setFooter("Moderator: hidden")
  .setTimestamp();

  member.roles.add(msg.guild.roles.cache.get('769700241556504576'));
  const DM = new MessageEmbed()
  .setDescription(`You were **muted** in ${msg.guild.name}`)
  .addField("Reason", reason, true)
  .addField("Time", "Infinite", true)
  .setColor("YELLOW")
  .setFooter("Moderator: hidden")
  .setTimestamp();
  user.send(DM);
  return msg.channel.send(embed);
  }
}