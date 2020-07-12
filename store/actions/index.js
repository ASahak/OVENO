import {
    SET_IS_LOGGED,
    SET_CATEGORY_LIST,
} from '../types';

export const __CHANGE_IS_LOGGED = (payload) => ({
    type: SET_IS_LOGGED,
    payload
});
export const __SET_CATEGORY_LIST = (payload) => ({
    type: SET_CATEGORY_LIST,
    payload
});
