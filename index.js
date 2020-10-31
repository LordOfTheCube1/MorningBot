const {Client, MessageEmbed, Collection} = require('discord.js');
const client = new Client();
const express = require('express');
const app = express();
const port = 3000;
const uniqid = require("uniqid");
const prefix = "mb!";
const Database = require("@replit/database")


client.punishments = new Database();
client.cache = new Collection();
client.modroles = ['599376736811089940', '739271867822768238', '599376640715390997'];
/* app.use('/', (req, res, next) => {
  if(req.method != "GET") {
    next();
  }
  console.log(`==== ${req.method} request \n  === From: ${req.ip} \n  === To ${req.path}\n`);
  next();
})*/ // Request logger

app.get('/', (req, res) => res.send("<h1> Hello </h1> <br> <a href='https://twitch.tv/morningmax27'>Twitch</a><br>"));
app.listen(port, () => console.log(`Bot on server at http: //localhost:${port}`))
client.login(process.env.Token)

client.on("ready", () => {
    client.session = uniqid.time('S-', `-${Math.floor(Date.now() / 5000)}`);
  console.log(`Bot online - Session ID ${client.session}`);
    client.user.setActivity("things", {

        type: "STREAMING",
        url: "https://twitch.tv/morningmax27"
    });
    client.punishments.list().then(async k => {
      for(let i = 0; i < k.length; i++) {
        client.cache.set(k[i], await client.punishments.get(k[i]));
      }
      console.log("Punishments fully cached.");
    })

    setInterval(async () => {
      const expired = client.cache.filter(e => e.expires <= Date.now());
      expired.forEach((e, k) => {
        client.punishments.delete(k).then(() => {
          client.cache.delete(k);
          client.guilds.cache.get('727867210646814780').members.cache.get(e.user).roles.remove('769700241556504576', 'Mute expired');
        });
        
      });
    }, 15000)
    
})
function makeEmbed(input, title) {

    const embed = new MessageEmbed()
    embed.setColor("#ffae00")
    embed.setAuthor("MorningBot", client.user.avatarURL())
    embed.setDescription(input.replace(/>>/g, "    "))
    if (title) embed.setTitle(title)
    return embed
}
client.on('message', message => {
  //console.log(client.user.avatarURL())
  const pinged = ["<@759525790488199198>", "<@!759525790488199198>"];

  if(pinged.some(w => ` ${message.content.toLowerCase()} `.includes(` ${w} `))) message.channel.send('yeah wot m8');
if(message.content.startsWith(prefix)) {
  const args = message.content.split(' ');
  const cmd = args.shift().slice(prefix.length).toLowerCase();
  //console.log(cmd)
    try {
      let file;
      try {
        file = require(`./commands/${cmd}.js`);
      } catch(e) {
        return;
      }
      file.run(client, message, args);
    } catch(err) {
      const id = uniqid.process('ERR-');
      msg.channel.send(`I ran into a problem while trying to run the ${cmd} command. Please contact the developer with the following id: ${id}`);
      console.warn(`${id} : Error while running ${cmd} command during ${client.session} session:\n${err}`)
    }
}
})
