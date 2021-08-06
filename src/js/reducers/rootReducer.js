import { combineReducers }  from 'redux';
import login                from './loginReducer';
import data                 from './dataReducer';

const rootReducer = combineReducers({
  login,data
});

export default rootReducer;
