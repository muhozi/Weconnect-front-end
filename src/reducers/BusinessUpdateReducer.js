import {
  DISMISS_UPDATE_BUSINESS_MESSAGE,
  UPDATE_BUSINESS,
  UPDATE_BUSINESS_SUCCESS,
  UPDATE_BUSINESS_ERROR,
  EDIT_BUSINESS,
  CANCEL_EDIT_BUSINESS
} from '../actions/Constants';

const initialState = {
  message: '',
  errors: {},
  success: false,
  error: false,
  edit: false
};
/**
 * Message reducers
 */
export default function BusinessReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BUSINESS:
      return {
        ...state,
        success: true,
        error: false,
        errors: {},
        message: action.message
      };
    case UPDATE_BUSINESS_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        errors: {},
        message: action.message
      };
    case UPDATE_BUSINESS_ERROR:
      return {
        ...state,
        success: false,
        error: true,
        errors: action.errors,
        message: action.message
      };
    case DISMISS_UPDATE_BUSINESS_MESSAGE:
      return { ...state, message: '', errors: {} };
    case EDIT_BUSINESS:
      return { ...state, edit: true };
    case CANCEL_EDIT_BUSINESS:
      return { ...state, edit: false, message: '' };
    default:
      return state;
  }
}
