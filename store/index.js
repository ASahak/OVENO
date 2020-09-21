import rootReducer from 'store/reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { _rootSaga } from 'store/saga';
const composeEnhancers = compose;

const state = {
    auth: {
        user: null,
    },
    product: {
        categoryList: null,
    },
};

const sagaMiddleware = createSagaMiddleware();
export function configureStore(initialState = {}) {
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));
    // store.runSaga = sagaMiddleware.run;
    return store;
}
const store = configureStore(state);

sagaMiddleware.run(_rootSaga);
export default store;
