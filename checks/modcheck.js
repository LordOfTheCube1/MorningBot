module.exports = (client, msg) => {
if(msg.member.roles.cache.array().filter(r => client.modroles.includes(r))) {
  return true;
} else {
  //msg.member.roles.cache.array().filter(r => client.modroles.includes(r))
  //msg.member.roles.cache.map(x=>x.id)
  //console.log(msg.member.roles.cache.array().filter(r => //client.modroles.includes(r)))
  //console.log(client.modroles)
return false;
}

}