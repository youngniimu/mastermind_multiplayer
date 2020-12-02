const _ = require('lodash');

const rooms = {};

const createId = () => Math.floor(1000 + Math.random() * 9000).toString();
const createCode = () => {
  const code = [1, 1, 1, 1];
  const secret = code.map((c) => c * Math.floor(Math.random() * 7 + 1));
  return secret;
};
const createRoom = () => {
  const newRoom = {
    id: createId(),
    secretCode: createCode(),
    players: [],
    status: 'lobby',
    round: 0,
  };
  rooms[newRoom.id] = newRoom;
  console.log(`ROOM ${newRoom.id} CREATED.`);
  console.log(rooms);
  return newRoom;
};

const deleteRoom = (roomId) => {
  delete rooms[roomId];
  console.log(`ROOM ${roomId} DELETED.`);
  console.log(rooms);
};

const joinRoom = (player, roomId) => {
  // const newRoom = rooms[roomId].players;
  // const list = newRoom.players;
  // const newList = [...list, player.id];
  // newRoom.players = newList;
  // rooms[roomId] = newRoom;
  rooms[roomId].players.push(player.id);
  console.log(`${player.name} JOINED ROOM${roomId}`);
};

const leaveRoom = (player, roomId) => {
  const newList = rooms[roomId].players.filter((id) =>
    id === player.id ? null : id
  );
  //const newList = list.filter((p) => (p === player.id ? null : p));
  //newRoom.players = newList;
  rooms[roomId].players = newList;
  console.log(`${player.name} LEFT ROOM${roomId}`);
};

const emptyRoom = (roomId) => rooms[roomId].players.length === 0;
//   const newRoom = rooms.find((room) => room.id === roomId);
//   const list = newRoom.players;
//   if (list.length === 0) {
//     return true;
//   }
//   return false;
// };

const resetRoom = (roomId) => {
  const roomToReset = rooms[roomId];
  const newRoom = {
    ...roomToReset,
    round: 0,
    secretCode: createCode(),
    status: 'lobby',
  };
  rooms[roomId] = newRoom;
  console.log('ROOM READY FOR NEW ROUND', newRoom);
};

const existingRoom = (roomId) => rooms[roomId];
const playersInRoom = (roomId) => rooms[roomId].players;
const getRoomInfo = (roomId) => rooms[roomId];
const changeRoomStatus = (roomId, status) => (rooms[roomId].status = status);
const checkRoomStatus = (roomId) => rooms[roomId].status;
const nextRound = (roomId) => (rooms[roomId].round = +1);

module.exports = {
  existingRoom,
  createRoom,
  deleteRoom,
  getRoomInfo,
  joinRoom,
  leaveRoom,
  emptyRoom,
  playersInRoom,
  changeRoomStatus,
  checkRoomStatus,
  nextRound,
  resetRoom,
};

// let rooms = [];

// const createId = () => Math.floor(1000 + Math.random() * 9000).toString();
// const createCode = () => {
//   const code = [1, 1, 1, 1];
//   const secret = code.map((c) => c * Math.floor(Math.random() * 7 + 1));
//   return secret;
// };
// const createRoom = () => {
//   const newRoom = {
//     id: createId(),
//     secretCode: createCode(),
//     players: [],
//     status: 'lobby',
//     round: 0,
//   };
//   rooms = [...rooms, newRoom];
// 	//rooms.push(newRoom);
// 	console.log(`ROOM ${newRoom.id} CREATED.`)
// 	console.log(rooms)
//   return newRoom;
// };

// const deleteRoom = (roomId) => {
// 	rooms = rooms.filter((room) => (room.id === roomId ? null : room));
// 	console.log(`ROOM ${roomId} DELETED.`)
// 	console.log(rooms)
// };

// const joinRoom = (player, roomId) => {
//   const newRoom = rooms.find((room) => room.id === roomId);
//   const list = newRoom.players;
//   const newList = [...list, player.id];
//   newRoom.players = newList;
// 	rooms = rooms.map((room) => (room.id === roomId ? newRoom : room));
// 	console.log(`${player.name} JOINED ROOM${roomId}`)
// };

// const leaveRoom = (player, roomId) => {
//   const newRoom = rooms.find((room) => room.id === roomId);
//   const list = newRoom.players;
//   const newList = list.filter((p) => (p === player.id ? null : p));
//   newRoom.players = newList;
// 	rooms = rooms.map((room) => (room.id === roomId ? newRoom : room));
// 	console.log(`${player.name} LEFT ROOM${roomId}`)
// };

// const emptyRoom = (roomId) => {
//   const newRoom = rooms.find((room) => room.id === roomId);
//   const list = newRoom.players;
//   if (list.length === 0) {
//     return true;
//   }
//   return false;
// };

// const resetRoom = (roomId) => {
//   const roomToReset = rooms.find((room) => room.id === roomId);
//   const newRoom = {
//     ...roomToReset,
//     round: 0,
//     secretCode: createCode(),
//     status: 'lobby',
// 	};
// 	rooms = rooms.map((room) => (room.id === roomId ? newRoom : room));
// 	console.log('ROOM READY FOR NEW ROUND', newRoom)
// };

// const existingRoom = (roomId) => rooms.find((room) => room.id === roomId);
// const playersInRoom = (roomId) =>
//   rooms.find((room) => room.id === roomId).players;
// const getRoomInfo = (roomId) => rooms.find((room) => room.id === roomId);
// const changeRoomStatus = (roomId, status) =>
//   (rooms.find((room) => room.id === roomId).status = status);
// const checkRoomStatus = (roomId) =>
//   rooms.find((room) => room.id === roomId).status;
// const nextRound = (roomId) =>
//   (rooms.find((room) => room.id === roomId).round += 1);

// module.exports = {
//   existingRoom,
//   createRoom,
//   deleteRoom,
//   getRoomInfo,
//   joinRoom,
//   leaveRoom,
//   emptyRoom,
//   playersInRoom,
//   changeRoomStatus,
//   checkRoomStatus,
//   nextRound,
//   resetRoom,
// };
