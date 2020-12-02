import {
  SET_GAMEPLAY,
  ADD_HISTORY,
  RESET_GAMEPLAY,
  SET_SECRET_CODE,
} from '../actions/types';

const INITIAL_STATE = {
  notes: Array(8).fill(true),
  code: Array(4).fill(0),
  history: [],
  secretCode: [],
};

const TEST_STATE = {
  notes: Array(8).fill(true),
  code: Array(4).fill(0),
  history: [
    {
      round: 0,
      code: [1, 1, 1, 1],
      result: [2, 2],
    },
    {
      round: 1,
      code: [1, 1, 1, 1],
      result: [2, 2],
    },
    {
      round: 2,
      code: [1, 1, 1, 1],
      result: [2, 2, 1],
    },
    {
      round: 3,
      code: [1, 1, 1, 1],
      result: [2, 2],
    },
    {
      round: 4,
      code: [1, 1, 1, 1],
      result: [2, 2],
    },
    {
      round: 5,
      code: [1, 1, 1, 1],
      result: [2, 2],
    },
    {
      round: 6,
      code: [1, 1, 1, 1],
      result: [2, 2],
    },
    {
      round: 7,
      code: [1, 1, 1, 1],
      result: [2, 2],
    },
    {
      round: 8,
      code: [1, 1, 1, 1],
      result: [2, 2, 1],
    },
  ],
  secretCode: [2, 4, 5, 2],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GAMEPLAY:
      return {
        notes: action.payload.notes,
        code: action.payload.code,
        history: state.history,
      };
    case RESET_GAMEPLAY:
      return INITIAL_STATE;
    case ADD_HISTORY:
      return {
        notes: state.notes,
        code: state.code,
        history: [
          ...state.history,
          {
            round: action.payload.round,
            code: action.payload.code,
            result: action.payload.result,
          },
        ],
      };
    case SET_SECRET_CODE:
      return { ...state, secretCode: action.payload };
    default:
      return state;
  }
};
