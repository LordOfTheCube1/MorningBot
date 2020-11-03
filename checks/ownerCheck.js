

module.exports = (id) => {
  const owners = ['439172671922503699', '659901334266576926', '327879060443234314'];
  if(owners.includes(id)) return true;
  else return false;
}