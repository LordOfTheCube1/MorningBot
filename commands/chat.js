
exports.run = async (client, message, args) => {
  if(!require('../checks/modcheck.js')(client, message)) {
    // console.log(require('../checks/modcheck.js')(client, message))
    return;
  }
//console.log('user has mod')
        message.delete();
        message.channel.send(args.join(" "));

}