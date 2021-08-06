import {BUY, SELL, SEND} from "../actions/actionTypes";
import initialState from './initialState';

function rootReducer(state = initialState.data, action) {

    let nextState;
    switch (action.type) {
        //TODO
        case BUY: {
            nextState = {...state, data: action.data};
            return nextState;
        }
        case SELL: {
            nextState = {...state, data: action.data};
            return nextState;
        }
        case SEND: {
            nextState = {...state, data: action.data};
            return nextState;
        }
        default:
            return state;
    }
}

export default rootReducer;