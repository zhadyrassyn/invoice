import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import './index.css';

import reducers from './reducers';
import App from './containers/App';

const middlewares = [reduxThunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('index')
);
