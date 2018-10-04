import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import './index.css';

import { LOGGED } from './actions/types';

import reducers from './reducers';
import App from './containers/App';

const middlewares = [reduxThunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers);

const role = localStorage.getItem('role');

if(role) {
  store.dispatch({ type: LOGGED, user: role });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('index')
);
