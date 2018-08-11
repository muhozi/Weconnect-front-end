import {
  ERROR,
  GET_MESSAGE,
  DISMISS_MESSAGE,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions/Constants';

const initialState = {
  message: '',
  errors: {},
  success: false,
  error: false
};
/**
 * Message reducers
 */
export default function MessageReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        register_success: true,
        errors: {},
        loading: false,
        message: action.message
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        login_success: true,
        errors: {},
        loading: false,
        message: action.message
      };
    case LOGOUT:
      return {
        ...state,
        success: true,
        error: false,
        logout_success: true,
        errors: {},
        message: action.data
      };
    case ERROR:
      return {
        ...state,
        success: false,
        error: true,
        errors: action.errors,
        message: action.message,
        loading: false
      };
    case GET_MESSAGE:
      return {
        ...state,
        success: false,
        error: false,
        errors: {},
        message: '',
        loading: false
      };
    case DISMISS_MESSAGE:
      return { ...state, message: '', errors: {} };
    default:
      return state;
  }
}
