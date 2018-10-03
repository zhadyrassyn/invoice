import _ from 'lodash';

import {
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
} from '../actions/types';

const initialState = {
  invoices: {},
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: _.mapKeys(action.data, '_id'),
      };
    case FETCH_INVOICES_FAILURE:
      return {
        error: action.message || "Server error",
      };
    default:
      return state;
  }
};
