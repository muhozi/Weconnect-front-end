import { combineReducers } from 'redux';
import message from './MessageReducer';
import auth from './AuthReducer';

export default combineReducers({
  message,
  auth
});
