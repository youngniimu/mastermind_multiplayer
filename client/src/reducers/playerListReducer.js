import { UPDATE_PLAYERLIST } from '../actions/types';

const TEST_STATE = [
  {
    name: 'hermpa',
    color: 'blue',
    ready: true,
    inGame: false,
    history: [3, 5, 2, 3, 5, 5, 2],
    result: [2, 1],
  },
  {
    name: 'herma',
    color: 'blue',
    ready: true,
    inGame: true,
    history: [1, 2, 0, 3, 2, 5, 6],
    result: [2, 1, 3],
  },
  {
    name: 'heanni',
    color: 'blue',
    ready: false,
    history: [3, 2, 3, 6, 7, 3, 4],
    result: [2, 1, 1, 2],
  },
  {
    name: 'hernni',
    color: 'blue',
    ready: false,
    history: [3, 2, 2, 1, 7, 2, 3],
    result: [2],
  },
  {
    name: 'hernni',
    color: 'blue',
    ready: true,
    history: [3, 2, 2, 6, 2, 2, 8],
    result: [2, 2, 2, 2],
  },
  {
    name: 'hpanni',
    color: 'blue',
    ready: true,
    history: [3, 2, 2, 6, 2, 2, 8],
    result: [2, 2, 2, 2],
  },
];

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_PLAYERLIST:
      return action.payload;
    default:
      return state;
  }
};
