import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import ApplicationReducer from './reducers';

const loggerMiddleware = createLogger();

const ApplicationStore = createStore(
  ApplicationReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);

export default ApplicationStore;
