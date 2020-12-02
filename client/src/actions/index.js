import io from 'socket.io-client';
import {
  CREATE_SOCKET,
  SET_NAME,
  SET_ROOM,
  SET_ID,
  UPDATE_PLAYERLIST,
  TOGGLE_READY,
  TOGGLE_INGAME,
  SET_GAMEPLAY,
  RESET_GAMEPLAY,
  ADD_HISTORY,
  TOGGLE_HEADER,
  SET_HEADER,
  SET_SECRET_CODE,
} from './types';

export const createSocket = () => {
  return async (dispatch) => {
    const socket = await io('localhost:8000/');

    dispatch({ type: CREATE_SOCKET, payload: socket });
  };
};

export const changeName = (name) => {
  return {
    type: SET_NAME,
    payload: name,
  };
};

export const changeRoom = (room) => {
  return {
    type: SET_ROOM,
    payload: room,
  };
};

export const setId = (socket) => {
  return {
    type: SET_ID,
    payload: socket,
  };
};

export const updatePlayerList = (playerList) => {
  return {
    type: UPDATE_PLAYERLIST,
    payload: playerList,
  };
};

export const toggleReady = () => {
  return {
    type: TOGGLE_READY,
  };
};

export const toggleInGame = () => {
  return {
    type: TOGGLE_INGAME,
  };
};

export const setGameplay = (gameplay) => {
  return {
    type: SET_GAMEPLAY,
    payload: {
      notes: gameplay.notes,
      code: gameplay.code,
    },
  };
};

export const resetGameplay = () => {
  return {
    type: RESET_GAMEPLAY,
  };
};

export const setSecretCode = (secretCode) => {
  return {
    type: SET_SECRET_CODE,
    payload: secretCode,
  };
};

export const addHistory = (history) => {
  return {
    type: ADD_HISTORY,
    payload: history,
  };
};

export const toggleHeader = () => {
  return {
    type: TOGGLE_HEADER,
  };
};

export const setHeader = (headerState) => {
  return {
    type: SET_HEADER,
    payload: headerState,
  };
};
