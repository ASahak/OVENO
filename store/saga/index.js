import { all, put } from 'redux-saga/effects';
import {
    __CHANGE_IS_LOGGED,
} from '../actions';
import store from 'store';


export function* __SET_LOGGED(payload) {
    yield put(store.dispatch(__CHANGE_IS_LOGGED(payload)));
}

export function * _rootSaga () {
    yield all([
        __SET_LOGGED,
    ])
}
