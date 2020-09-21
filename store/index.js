import rootReducer from 'store/reducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { _rootSaga } from 'store/saga';

const state = {
    auth: {
        user: null,
    },
    product: {
        categoryList: null,
    },
};

const sagaMiddleware = createSagaMiddleware();
export function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    return store;
}
const store = configureStore();

sagaMiddleware.run(_rootSaga);
export default store;
