import {
  SET_NAME,
  SET_ROOM,
  SET_ID,
  TOGGLE_READY,
  TOGGLE_INGAME,
  SET_HEADER,
  TOGGLE_HEADER,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  room: '',
  result: [],
  ready: false,
  inGame: false,
  header: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_ROOM:
      return { ...state, room: action.payload };
    case SET_ID:
      return { ...state, id: action.payload };
    case TOGGLE_READY:
      return { ...state, ready: !state.ready };
    case TOGGLE_INGAME:
      return { ...state, inGame: !state.inGame };
    case TOGGLE_HEADER:
      return { ...state, header: !state.header };
    case SET_HEADER:
      return { ...state, header: action.payload };
    default:
      return state;
  }
};
