const hash = require('object-hash');

const users = [];

const formatUser = (id, userName) => {
  return {
    id,
    clientId: hash(id),
    userName,
    room: null
  };
};

const userJoin = (id, userName, room) => {
  const user = { id, userName, room };
  users.push(user);
  console.log('room users', users);
  return user;
};

// Get current user
const getCurrentUser = id => {
  return users.find(user => user.id === id);
};

// User leaves chat
const userLeave = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  formatUser,
  userJoin,
  getCurrentUser,
  userLeave
};
