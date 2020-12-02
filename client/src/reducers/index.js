import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import playerReducer from './playerReducer';
import playerListReducer from './playerListReducer';
import gameplayReducer from './gameplayReducer';

export default combineReducers({
  socket: socketReducer,
  player: playerReducer,
  playerList: playerListReducer,
  gameplay: gameplayReducer,
});
