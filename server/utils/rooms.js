const _default = ['WomenTalk', 'MenTalk'];

const formatRoom = name => ({
  name,
  users: []
});

const findRoom = (name, list) => list.findIndex(room => room.name === name);

const defaultRooms = _default.map(name => formatRoom(name));

module.exports = {
  defaultRooms,
  formatRoom,
  findRoom
};
