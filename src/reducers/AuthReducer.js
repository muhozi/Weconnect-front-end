import { CHECKING_TOKEN, SUCCESS_TOKEN, NO_TOKEN } from '../actions/Constants';
/**
 *
 * @param {object} state - Initial Reducer state
 * @param {object} action - action
 */
export default function sampleReducer(state = {}, action) {
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
      console.log('Authenticated');
      return {
        ...state,
        loading: false,
        error: false,
        logged_in: true,
        errors: {},
        token: action.data.token,
        message: null
      };
    case NO_TOKEN:
      console.log('Unauthenticated');
      return {
        ...state,
        loading: false,
        error: false,
        logged_in: false,
        errors: {},
        message: null
      };
    default:
      return state;
  }
}
