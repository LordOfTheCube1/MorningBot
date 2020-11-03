/* 
 COPYRIGHT (C) 2020 LordOfTheCube and Komali
 Licensed under GNU General Public License v3.0 (more details in "LICENSE" file)
*/

const fs = require("fs");
const { MessageEmbed } = require('discord.js');
//const embed = require('./commands/embedfunction.js')
function makeEmbed(input, title, url) {
    const embed = new MessageEmbed()
    embed.setColor("#2181db")
    embed.setAuthor("MorningBot", url)
    //console.log(input)
    embed.setDescription(input.replace(/>>/g, "    "))
    
    if (title) embed.setTitle(title)
    return embed
}
exports.run = async (client, message, splitMessage) => {
           var insults = fs.readFileSync('insults.txt',
            { encoding: 'utf8', flag: 'r' });
            
        insults = insults.split("\n")
        insults.pop()
        //console.log(insults)
        if (splitMessage[0] == "list") {
            message.channel.send(makeEmbed(insults.join("\n"), "Insults", client.user.avatarURL()))
        }
        else if (splitMessage[0] == "request" || splitMessage[0] == "suggest") {
            if (splitMessage[1]) {
                fs.appendFileSync("insultrequests.txt", "From " + message.author.tag + ": " + message.content.split(/ (.+)/)[1].split(/ (.+)/)[1] + "\n");
                message.channel.send(makeEmbed("Suggestion recorded: " + message.content.split(/ (.+)/)[1].split(/ (.+)/)[1]), null, client.user.avatarURL())
            } // message.member.roles.cache.find(role => role.name === 'Moderators') || message.member.roles.cache.find(role => role.name === 'big mod people')

            else {
                message.channel.send(makeEmbed("Please suggest an insult"), null, client.user.avatarURL())
            }
        }
        else if (splitMessage[0] == "add") {
          console.log("1")
            if (require('../checks/modcheck.js')(client, message)) {
              console.log(splitMessage)
                if (splitMessage[1]) {
                  var string = ""
                  var req = fs.readFileSync('insultrequests.txt', { encoding: 'utf8'})
                  req = req.split("\n")
                  req.pop()
                  if(isNaN(splitMessage[1])){
                    message.channel.send(makeEmbed("Please Specify an integer!", null, client.user.avatarURL()))
                    return
                  }
                  if(parseInt(splitMessage[1]) < 1 || parseInt(splitMessage[1]) > req.length + 1){
                    message.channel.send("Invalid Integer")
                    return
                  }

                  var input = parseInt(splitMessage[1]) - 1
                  console.log(req[input])
                  fs.appendFileSync("insults.txt", req[input].split(/:(.+)/)[1] + "\n")
                  req.splice(input, 1)
                  fs.writeFileSync("insultrequests.txt", req.join("\n") + "\n")
                  console.log(req)

                  //fs.appendFileSync("insults.txt", req[input].split(/:(.+)/)[1] + "\n");
                    //fs.appendFileSync("insults.txt", message.content.split(/ (.+)/)[1].split(/ (.+)/)[1] + "\n");/*



                    //message.channel.send(makeEmbed("Insult Added: " + message.content.split(/ (.+)/)[1].split(/ (.+)/)[1]), null, client.user.avatarURL())*/
            } else {
                    message.channel.send(makeEmbed("No insult specified"), null, client.user.avatarURL())
                }
                } 

        }
        else if (splitMessage[0] == "listrequests" || splitMessage[0] == "listsuggestions" || splitMessage[0] == "requests" || splitMessage[0] == "suggestions") {
            if ((require('../checks/modcheck.js')(client, message))) {
                var string = ""
                  var req = fs.readFileSync('insultrequests.txt', { encoding: 'utf8'})
                  req = req.split("\n")
                  req.pop()
                  for(i=0;i<req.length;i++){
                    req[i] = `**[${i+1}]** ${req[i]}`
                  }
                    message.channel.send(makeEmbed(req.join('\n'), "Insult requests:", client.user.avatarURL()))
                
            }

        }
        else {
          
          //console.log(insults)
            message.channel.send(makeEmbed(insults[Math.floor(Math.random() * insults.length)]), null, client.user.avatarURL())
        }
}