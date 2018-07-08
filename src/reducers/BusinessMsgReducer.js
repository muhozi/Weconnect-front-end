import {
  GET_MESSAGE,
  DISMISS_BUSINESS_MESSAGE,
  REGISTER_BUSINESS,
  REGISTER_BUSINESS_SUCCESS,
  REGISTER_BUSINESS_ERROR
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
    case REGISTER_BUSINESS:
      return {
        ...state,
        success: true,
        error: false,
        register_success: true,
        errors: {},
        message: action.message
      };
    case REGISTER_BUSINESS_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        login_success: true,
        errors: {},
        message: action.message
      };
    case REGISTER_BUSINESS_ERROR:
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
    case DISMISS_BUSINESS_MESSAGE:
      return { ...state, message: '', errors: {} };
    default:
      return state;
  }
}
