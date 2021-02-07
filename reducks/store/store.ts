import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';

import { UsersReducer } from '../users/reducers';

export default function createStore() {

    let middleWares = [thunk];

    return reduxCreateStore(
        combineReducers({
            users: UsersReducer,
        }), applyMiddleware(
            ...middleWares
        )
    );
}