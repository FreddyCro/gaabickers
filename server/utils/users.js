const hash = require('object-hash');

const formatUser = (id, userName) => {
  return {
    id,
    clientId: hash(id),
    name: userName,
    room: null
  };
};

const findUser = (id, list) => list.findIndex(user => user.id === id);

module.exports = {
  formatUser,
  findUser
};
