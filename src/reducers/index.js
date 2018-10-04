import { combineReducers } from 'redux';
import invoiceReducer from './invoiceReducer';
import roleReducer from './roleReducer';

const rootReducer = combineReducers({
  invoices: invoiceReducer,
  role: roleReducer,
});

export default rootReducer;
