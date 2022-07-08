import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import IndexReducer from './indexReducer';
import IndexSaga from './indexSaga';

const sagaMiddleware = createSagaMiddleware();



const middleware = [sagaMiddleware];

export const store = createStore(IndexReducer, applyMiddleware(...middleware));

sagaMiddleware.run(IndexSaga);


export default store