
module.exports = (client, msg) => {
if(msg.member.roles.cache.array().filter(r => client.modroles.includes(r))) {
  return true;
} else {
return false;
}

}