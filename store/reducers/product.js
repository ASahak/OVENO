import {
    SET_CATEGORY_LIST,
} from '../types';

const auth = (state = {}, action) => {
    switch (action.type) {
        case SET_CATEGORY_LIST:
            return {...state, categoryList: action.payload};
        default:
            return state;
    }
};
export default auth;
