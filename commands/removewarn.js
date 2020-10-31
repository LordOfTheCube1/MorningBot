exports.run = async (client, msg, args) => {

      if(!require('../checks/modcheck.js')(client, msg)) return;

        const warn = client.cache.get(args[0]);

      if(!warn) return msg.reply("That warning does not exist!");

        client.punishments.delete(args[0]).then(() => {
          client.cache.delete(args[0]);
          msg.channel.send(`I have deleted ${warn.user}'s warning **` + warn.id + "**");
        })

}