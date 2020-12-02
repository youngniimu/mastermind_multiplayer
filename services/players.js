const _ = require('lodash');
const { playersInRoom } = require('./rooms');

const colors = [
  '#1dd1a1',
  '#48dbfb',
  '#ff6b6b',
  '#feca57',
  '#ff9ff3',
  '#5f27cd',
];

const players = {};

const createPlayer = (player) => {
  const newPlayer = {
    ...player,
    color: colors[playersInRoom(player.room).length],
    history: [],
    inGame: false,
    wins: 0,
  };
  players[newPlayer.id] = newPlayer;
  console.log(`PLAYER ${newPlayer.name} CREATED.`);
  console.log(players);
  return newPlayer;
};

const resetPlayer = (id) => {
  const existingPlayer = players[id];
  const newPlayer = {
    ...existingPlayer,
    history: [],
    result: [],
    inGame: false,
    ready: false,
  };
  players[id] = newPlayer;
  console.log(players);
};

const deletePlayer = (player) => {
  const { id } = player;
  delete players[id];
  // players = players.filter((p) => (p.id === player.id ? null : p));
  console.log(`PLAYER ${player.name} DELETED.`);
  console.log(players);
};

const togglePlayerReady = (id) => {
  const player = players[id];
  const newPlayer = { ...player, ready: !player.ready };
  players[id] = newPlayer;
  // players = players.map((player) => (player.id === id ? newPlayer : player));
  // console.log(`${newPlayer.name} IS READY: ${newPlayer.ready}`);
};

const setPlayerReady = (id, status) => {
  const player = players[id];
  const newPlayer = { ...player, ready: status };
  players[id] = newPlayer;
  //console.log(`${newPlayer.name} IS READY: ${status}`);
};

const togglePlayerInGame = (id) => {
  const player = players[id];
  const newPlayer = { ...player, inGame: !player.inGame };
  players[id] = newPlayer;
  console.log(`${newPlayer.name} IS INGAME: ${player.inGame}`);
};

const setPlayerInGame = (id, status) => {
  const player = players[id];
  const newPlayer = { ...player, inGame: status };
  players[id] = newPlayer;
  console.log(`${newPlayer.name} IS INGAME: ${status}`);
};

const setPlayerResult = (id, result) => {
  const player = players[id];
  const newHistory = [...player.history, result.reduce((a, b) => a + b, 0)];
  const newPlayer = { ...player, result: result, history: newHistory };
  players[id] = newPlayer;
};

const playerWin = (id) => {
  const player = players[id];
  const newPlayer = { ...player, wins: player.wins + 1 };
  players[id] = newPlayer;
};

const getPlayerInfo = (id) => players[id];

module.exports = {
  createPlayer,
  deletePlayer,
  resetPlayer,
  getPlayerInfo,
  togglePlayerReady,
  togglePlayerInGame,
  setPlayerResult,
  setPlayerReady,
  setPlayerInGame,
  playerWin,
};

// const { playersInRoom } = require('./rooms');

// const colors = [
//   '#1dd1a1',
//   '#48dbfb',
//   '#ff6b6b',
//   '#feca57',
//   '#ff9ff3',
//   '#5f27cd',
// ];

// let players = [];

// const createPlayer = (player) => {
//   const newPlayer = {
//     ...player,
//     color: colors[playersInRoom(player.room).length],
//     history: [],
//     inGame: false,
//   };
//   players = [...players, newPlayer];
//   //players.push({...player, color: colors[playersInRoom(player.room).length]})
//   console.log(`PLAYER ${newPlayer.name} CREATED.`);
//   console.log(players);
//   return player;
// };

// const resetPlayer = (id) => {
//   const existingPlayer = getPlayerInfo(id);
//   const newPlayer = {
//     ...existingPlayer,
//     history: [],
//     result: [],
//     inGame: false,
//     ready: false,
//   };
//   players = players.map((player) => (player.id === id ? newPlayer : player));
//   console.log(players);
// };

// const deletePlayer = (player) => {
//   players = players.filter((p) => (p.id === player.id ? null : p));
//   console.log(`PLAYER ${player.name} DELETED.`);
//   console.log(players);
// };

// const togglePlayerReady = (id) => {
//   const player = getPlayerInfo(id);
//   const newPlayer = { ...player, ready: !player.ready };
//   players = players.map((player) => (player.id === id ? newPlayer : player));
//   console.log(`${newPlayer.name} IS READY: ${newPlayer.ready}`);
// };

// const setPlayerReady = (id, status) => {
//   const player = getPlayerInfo(id);
//   const newPlayer = { ...player, ready: status };
//   players = players.map((player) => (player.id === id ? newPlayer : player));
//   console.log(`${newPlayer.name} IS READY: ${status}`);
// };

// const togglePlayerInGame = (id) => {
//   const player = getPlayerInfo(id);
//   const newPlayer = { ...player, inGame: !player.inGame };
//   players = players.map((player) => (player.id === id ? newPlayer : player));
//   console.log(`${newPlayer.name} IS INGAME: ${player.inGame}`);
// };

// const setPlayerInGame = (id, status) => {
//   const player = getPlayerInfo(id);
//   const newPlayer = { ...player, inGame: status };
//   players = players.map((player) => (player.id === id ? newPlayer : player));
//   console.log(`${newPlayer.name} IS INGAME: ${status}`);
// };

// const setPlayerResult = (id, result) => {
//   const player = getPlayerInfo(id);
//   const newHistory = [...player.history, result.reduce((a, b) => a + b, 0)];
//   const newPlayer = { ...player, result: result, history: newHistory };
//   players = players.map((player) => (player.id === id ? newPlayer : player));
// };

// const getPlayerInfo = (id) => players.find((player) => player.id === id);

// module.exports = {
//   createPlayer,
//   deletePlayer,
//   resetPlayer,
//   getPlayerInfo,
//   togglePlayerReady,
//   togglePlayerInGame,
//   setPlayerResult,
//   setPlayerReady,
//   setPlayerInGame,
// };
