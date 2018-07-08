import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV == 'development')
    middleware.push(logger);


export default createStore(reducers, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);