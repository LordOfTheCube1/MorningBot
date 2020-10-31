exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You do not have permission to do that!!1!1!!");

    if (!args[0]) return message.reply("You must specifiy a user to ban.");
    const user = message.mentions.users.first();
    try {
      if(!user) user = await client.users.fetch(args[0], false);
    } catch(e) {
      return msg.reply("You must provide a valid user.");
    }

      const member = message.guild.member(user);
      if(!member) {
        return message.reply("I can't ban someone who isn't in the server (although you can still do it manually)!");
      }

        if((member.roles.highest.position >= message.member.roles.highest.position) && (message.guild.ownerID !== message.author.id)) return message.reply('You can\'t ban someone who\'s a higher role than you!');
        const reason = args.slice(1).join(" ");
        member.ban({days: 7, reason: reason}).then(() => {
          message.channel.send(`I have banned **${user.tag}** for reason **${reason}**`);
        }).catch(err => {
          message.reply("I was unable to ban that member. They may have higher roles or be the server owner.");
          console.warn(err);
        });


}