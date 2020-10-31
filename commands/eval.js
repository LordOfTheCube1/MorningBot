const isOwner = require('../checks/ownerCheck.js');
const beautify = require('beautify');
const { MessageEmbed } = require('discord.js');

exports.run = async(client, msg, args) => {
  if(!isOwner(msg.author.id)) {
    const notOwner = await msg.channel.send('e')
        return notOwner.delete({
          timeout: 15000,
          reason: 'User of evaluation command not owner'
        });
  }
  if (!args[0]) {
    const runNothing = await msg.channel.send('<:bruh:730688438138830858> yes because running nothing is possible');
          return runNothing.delete({
            timeout: 20000,
            reason: 'No code provided in evaluation command'
          });
  }
  let toEval = args.join(" ");
  try {
      if(toEval.toLowerCase().includes('token')) {
        return msg.channel.send(new MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                                                              .setFooter("Contains keyword 'token'.")
                                                              .setColor(0xFF0000));
      }
      if(toEval.toLowerCase().includes('config')) {
        return msg.channel.send(new MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                                                              .setFooter("Contains keyword 'config'")
                                                              .setColor(0xFF0000));
      }
      if(toEval.toLowerCase().includes('.env')) {
        return msg.channel.send(new MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                                                              .setFooter("Contains keyword '.env'")
                                                              .setColor(0xFF0000));
      }
      const evaluated = eval(toEval);
      if((!JSON.stringify(evaluated, null, 4) >= 500) && typeof evaluated == "object") evaluated = "```json\n" + JSON.stringify(evaluated, null, 4) + "```"  
      let embed = new MessageEmbed()
                  .setColor(0x00FF00)
                  .setTimestamp()
                  .setFooter(client.user.username, client.user.displayAvatarURL)
                  .setTitle('Eval')
                  .addField('Ran:', `\`\`\`js\n${beautify(args.join(" "), {format: 'js'})}\n\`\`\``)
                  .addField('Returned:', evaluated)
                  .addField("Type of:", typeof(evaluated));
      msg.channel.send(embed);


  } catch (e) {

    let embed = new MessageEmbed()
                .setColor(0xFF0000)
                .setTitle('\:x: Error!')
                .setTimestamp()
                .setDescription(e)
                .setFooter(client.user.username, client.user.displayAvatarURL);
    return msg.channel.send(embed);


  }
}

