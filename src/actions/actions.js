import {
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  SAVE_INVOICE_SUCCESS,
  SAVE_INVOICE_FAILURE,
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
  console.log('invoice ', invoice);
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
}