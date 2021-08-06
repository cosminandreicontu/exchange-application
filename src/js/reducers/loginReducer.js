import actionTypes      from '../actions/actionTypes';
import initialState     from './initialState';

export default function userRole(state = initialState.login, action) {
      let newState;
      switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
          newState = {...state, userName:action.user};
          return newState;
        case actionTypes.SAVE_TOKEN:
          newState = {...state, token: action.token};
          return newState;
        case actionTypes.DELETE_TOKEN:
        case actionTypes.LOGIN_ERROR:
        case actionTypes.LOGOUT:
        case actionTypes.LOGIN_CANCELLED:
          localStorage.clear()
          newState = {...state, token: null,userName:null};
          return newState;
        default:
          return state;
      }
}
