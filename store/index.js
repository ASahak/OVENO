import rootReducer from 'store/reducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { _rootSaga } from 'store/saga';

import { composeWithDevTools } from 'redux-devtools-extension';

const state = {
    auth: {
        user: null,
    },
    product: {
        categoryList: null,
    },
};

export function configureStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    store.runSaga = sagaMiddleware.run;
    return store;
}
const store = configureStore(state);

store.runSaga(_rootSaga);
export default store;
