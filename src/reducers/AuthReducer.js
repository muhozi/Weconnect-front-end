import {
  CHECKING_TOKEN,
  SUCCESS_TOKEN,
  NO_TOKEN,
  LOGOUT
} from '../actions/Constants';
/**
 * Authentication Reducer
 */
export default function AuthReducer(state = {}, action) {
  switch (action.type) {
    case CHECKING_TOKEN:
      return {
        ...state,
        loading: true,
        error: false,
        logged_in: false,
        errors: {},
        token: null,
        message: 'Loading ...'
      };
    case SUCCESS_TOKEN:
      return {
        ...state,
        loading: false,
        error: false,
        logged_in: true,
        errors: {},
        token: action.data.access_token,
        user: action.data.user,
        message: null
      };
    case NO_TOKEN:
      return {
        ...state,
        loading: false,
        error: false,
        logged_in: false,
        logged_out: true,
        errors: {},
        message: null
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        error: false,
        logged_in: false,
        errors: {},
        token: null,
        user: {},
        message: action.data.message
      };
    default:
      return state;
  }
}
