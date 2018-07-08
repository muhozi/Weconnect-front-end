import { combineReducers } from 'redux';
import message from './MessageReducer';
import auth from './AuthReducer';
import businesses from './BusinessesReducer';
import myBusinesses from './UserBusinessesReducer';
import businessMessage from './BusinessMsgReducer';
import business from './BusinessReducer';
export default combineReducers({
  message,
  auth,
  businesses,
  myBusinesses,
  business,
  businessMessage
});
