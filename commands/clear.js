/* 
 COPYRIGHT (C) 2020 LordOfTheCube and Komali
 Licensed under GNU General Public License v3.0 (more details in "LICENSE" file)
*/

exports.run = async (client, msg, args) => {
  if(!msg.member.hasPermission("MANAGE_MESSAGES")) {
    const permMsg = await msg.channel.send(`<@${msg.author.id}>, You do not have permission to do that!!1!1!!`);
    if(permMsg.deleteable) return;
    return permMsg.delete({
      timeout: 7000
    });
  }


    let toDelete = args[0];
    if(!isNaN(toDelete)) {
      toDelete++;
      return msg.channel.bulkDelete(toDelete).catch(e => {
        msg.channel.send('I couldn\'t delete those messages. Normally, this is because you cannot bulk delete messages that are over 2 weeks old.');
      });
    } else {
      return msg.channel.send('You must provide a **number** of messages to delete.');
    }

  }