import {
  ERROR,
  GET_MESSAGE,
  DISMISS_MESSAGE,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS
} from '../actions/Constants';

const initialState = {
  message: '',
  errors: {},
  success: false,
  error: false
};
/**
 *
 * @param {object} state - Initial Reducer state
 * @param {object} action - action
 */
export default function sampleReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        register_success: true,
        errors: {},
        message: action.message
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        login_success: true,
        errors: {},
        message: action.message
      };
    case ERROR:
      return {
        ...state,
        success: false,
        error: true,
        errors: action.errors,
        message: action.message
      };
    case GET_MESSAGE:
      return {
        ...state,
        success: false,
        error: false,
        errors: {},
        message: ''
      };
    case DISMISS_MESSAGE:
      return { ...state, message: '', errors: {} };
    default:
      return state;
  }
}
