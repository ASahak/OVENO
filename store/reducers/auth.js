import {
    SET_IS_LOGGED,
} from '../types';

const auth = (state = {}, action) => {
    switch (action.type) {
        case SET_IS_LOGGED:
            return {...state, user: {...action.payload.user}};
        default:
            return state;
    }
};
export default auth;
