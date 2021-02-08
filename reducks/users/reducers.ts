import * as Actions from './types';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action: Actions.UsersActionTypes) => {
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SIGN_OUT:
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}