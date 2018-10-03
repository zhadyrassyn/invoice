import {
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE
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
