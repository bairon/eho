import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ehoApp from './reducers';
import App from './components/App';

// Setup socket.io middleware
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io();
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

// Create the store
let store = applyMiddleware(socketIoMiddleware)(createStore)(ehoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
