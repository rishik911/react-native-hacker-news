import {combineReducers} from 'redux';
import HomeReducer from '../modules/HomeModule/Redux/HomeReducer'
const appReducer = combineReducers({
   HomeReducer : HomeReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;