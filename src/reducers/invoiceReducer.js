import _ from 'lodash';

import {
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  SAVE_INVOICE_SUCCESS,
  SAVE_INVOICE_FAILURE,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILURE
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
    case SAVE_INVOICE_SUCCESS:
      const id = action.data._id;
      return {
        ...state,
        invoices: {
          ...state.invoices,
          [id] : action.data,
        },
      };
    case SAVE_INVOICE_FAILURE:
      return {
        error: action.message || "Server error",
      };
    case DELETE_INVOICE_SUCCESS:
      const data = _.omit(state.invoices, action.id);
      return {
        ...state,
        invoices: data
      };
    case DELETE_INVOICE_FAILURE:
      return {
        error: action.message || "Server error",
      };
    case UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          ...state.invoices,
          [action.data._id]: action.data
        }
      };
    default:
      return state;
  }
};
