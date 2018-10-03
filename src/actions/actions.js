import {
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  SAVE_INVOICE_SUCCESS,
  SAVE_INVOICE_FAILURE,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILURE,
} from './types';

import axios from 'axios';

export const fetchInvoices = () => (dispatch) => {
  const request = 'http://localhost:3000/api/invoice';
  axios.get(request)
    .then(({data}) => {
      dispatch({
        type: FETCH_INVOICES_SUCCESS,
        data: data.invoices,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_INVOICES_FAILURE,
        error: error.response && error.response.message,
      });
    });
};

export const saveInvoice = (invoice, callback) => (dispatch) => {
  const request = 'http://localhost:3000/api/invoice';
  axios.put(request, invoice)
    .then(({data}) => {
    console.log('data ', data);
      dispatch({
        type: SAVE_INVOICE_SUCCESS,
        data,
      });
      callback();
    })
    .catch((error) => {
      dispatch({
        type: SAVE_INVOICE_FAILURE,
        error: error.response && error.response.message,
      });
      callback();
    });
};

export const deleteInvoice = (id) => (dispatch) => {
  const request = `http://localhost:3000/api/invoice/${id}`;
  axios.delete(request)
    .then(({data}) => {
      dispatch({
        type: DELETE_INVOICE_SUCCESS,
        id,
      });
    })
    .catch((error) => {
      dispatch({
        type: DELETE_INVOICE_FAILURE,
        error: error.response && error.response.message,
      });
    });
};

export const updateInvoice = (id, invoice, callback) => (dispatch) => {
  const request = `http://localhost:3000/api/invoice/${id}`;
  axios.post(request, invoice)
    .then(({data}) => {
      dispatch({
        type: UPDATE_INVOICE_SUCCESS,
        data: data.invoice
      });
      callback()
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_INVOICE_FAILURE,
        error: error.response && error.response.message,
      });
      callback()
    });
};