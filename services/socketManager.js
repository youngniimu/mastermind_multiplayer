const io = require('../index.js').io;

const {
  existingRoom,
  createRoom,
  deleteRoom,
  getRoomInfo,
  joinRoom,
  leaveRoom,
  emptyRoom,
  playersInRoom,
  checkRoomStatus,
  changeRoomStatus,
  nextRound,
  resetRoom,
} = require('./rooms');

const {
  createPlayer,
  deletePlayer,
  getPlayerInfo,
  togglePlayerReady,
  togglePlayerInGame,
  setPlayerResult,
  setPlayerReady,
  setPlayerInGame,
  resetPlayer,
  playerWin,
} = require('./players');

const getResult = (myCode, secretCode) => {
  let result = [];
  let myCombination = [...myCode];
  let secretCombination = [...secretCode];

  for (i = 0; i < 4; i++) {
    if (myCombination[i] === secretCombination[i]) {
      result = result.concat(2);
      myCombination[i] = secretCombination[i] = null;
    }
  }

  for (i = 0; i < 4; i++) {
    for (x = 0; x < 4; x++) {
      if (myCombination[i] && secretCombination[x]) {
        if (myCombination[i] === secretCombination[x]) {
          result = result.concat(1);
          secretCombination[x] = myCombination[i] = null;
        }
      }
    }
  }
  return result;
};

const getPlayerList = (room) => {
  const players = playersInRoom(room);
  let newList = [];
  players.forEach((player) => {
    newList.push(getPlayerInfo(player));
  });
  return newList;
};

const toggleAllInGame = (room) => {
  const players = playersInRoom(room);
  players.forEach((player) => {
    togglePlayerInGame(player);
  });
};

const setAllInGame = (room, status) => {
  const players = playersInRoom(room);
  players.forEach((player) => {
    setPlayerInGame(getPlayerInfo(player).id, status);
  });
};

const allReady = (playerList) =>
  !playerList.find((player) => player.ready === false);
const allInLobby = (playerList) =>
  !playerList.find((player) => player.inGame === true);

module.exports = (socket) => {
  console.log('connection');

  socket.on('VERIFY_ROOM', (player, callback) => {
    if (!existingRoom(player.room)) {
      callback({
        isRoom: false,
        player: null,
        errMessage: 'that room does not exist',
      });
    } else if (checkRoomStatus(player.room) !== 'lobby') {
      callback({
        isRoom: false,
        player: null,
        errMessage: 'game has already started',
      });
    } else if (playersInRoom(player.room).length === 6) {
      callback({
        isRoom: false,
        player: null,
        errMessage: 'room is full',
      });
    } else {
      callback({
        isRoom: true,
        player: player,
        errMessage: '',
      });
    }
  });

  socket.on('CREATE_GAME', (player, callback) => {
    const newRoom = createRoom();
    const newPlayer = createPlayer({
      ...player,
      room: newRoom.id,
      id: socket.id,
    });
    joinRoom(newPlayer, newRoom.id);
    socket.join(newPlayer.room);
    io.to(newPlayer.room).emit('PLAYER_LIST', getPlayerList(newPlayer.room));
    callback({
      room: newPlayer.room,
      playerList: getPlayerList(newPlayer.room),
    });
  });

  socket.on('JOIN_GAME', (player) => {
    const newPlayer = createPlayer({ ...player, id: socket.id });
    joinRoom(newPlayer, newPlayer.room);
    socket.join(newPlayer.room);
    io.to(newPlayer.room).emit('PLAYER_LIST', getPlayerList(newPlayer.room));
  });

  socket.on('NEW_GAME', (id) => {
    const { room } = getPlayerInfo(id);
    if (checkRoomStatus(room) !== 'lobby') resetRoom(room);
    resetPlayer(id);
    io.to(room).emit('PLAYER_LIST', getPlayerList(room));
  });

  socket.on('READY', (id) => {
    const { room } = getPlayerInfo(id);
    togglePlayerReady(id);
    io.to(room).emit('PLAYER_LIST', getPlayerList(room));
    if (allReady(getPlayerList(room)) && allInLobby(getPlayerList(room))) {
      io.to(room).emit('START_ROUND');
      nextRound(room);
      toggleAllInGame(room);
      io.to(room).emit('PLAYER_LIST', getPlayerList(room));
      if (checkRoomStatus(room) === 'lobby') {
        changeRoomStatus(room, 'game');
      }
    }
  });

  socket.on('SUBMIT_CODE', ({ id, code }, callback) => {
    const { room } = getPlayerInfo(id);
    const { secretCode } = getRoomInfo(room);
    const result = getResult(code, secretCode);
    setPlayerResult(id, result);
    callback(result);
    togglePlayerReady(id);
    togglePlayerInGame(id);
    io.to(room).emit('PLAYER_LIST', getPlayerList(room));
    // GAME WON
    if (result.reduce((total, amount) => total + amount, 0) === 8) {
      playerWin(id);
      setAllInGame(room, true);
      changeRoomStatus(room, 'over');
      io.to(room).emit('GAME_WON', secretCode);
    }
  });

  socket.on('LEAVE_ROOM', (id) => {
    const player = getPlayerInfo(socket.id);
    if (player) {
      leaveRoom(player, player.room);
      io.to(player.room).emit('PLAYER_LIST', getPlayerList(player.room));
      deletePlayer(player);
      if (emptyRoom(player.room)) {
        deleteRoom(player.room);
      }
    }
  });

  socket.on('disconnect', () => {
    const player = getPlayerInfo(socket.id);
    if (player) {
      leaveRoom(player, player.room);
      io.to(player.room).emit('PLAYER_LIST', getPlayerList(player.room));
      deletePlayer(player);
      if (emptyRoom(player.room)) {
        deleteRoom(player.room);
      }
    }
  });
};
