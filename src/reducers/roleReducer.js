const initialState = {
  role: 'user',
};

import { LOGGED, LOGOUT } from '../actions/types';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED:
      return {
        ...state,
        role: action.user,
      };
    case LOGOUT:
      return {
        ...state,
        role: 'user',
      };
    default:
      return state;
  }
};
