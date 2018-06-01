import {
  SUCCESS,
  ERROR,
  GET_MESSAGE,
  DISMISS_MESSAGE
} from '../actions/Constants';

const initialState = {
  message: '',
  errors: {},
  success: false,
  error: false
};
export default function sampleReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
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
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
}
