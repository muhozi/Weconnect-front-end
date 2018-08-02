import {
  GET_BUSINESSES,
  GOT_BUSINESSES,
  BUSINESSES_ERROR
} from '../actions/Constants';

const initialState = {
  success: false,
  error: false,
  businesses: [],
  message: '',
  fetching: false
};
/**
 * Businesses reducers
 */
export default function BusinessesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BUSINESSES:
      return {
        ...state,
        success: false,
        error: false,
        businesses: [],
        fetching: true,
        message: 'Loading businesses ...'
      };
    case GOT_BUSINESSES:
      return {
        ...state,
        success: true,
        error: false,
        businesses: action.data.businesses,
        fetching: false,
        message: 'Loading businesses ...'
      };
    case BUSINESSES_ERROR:
      return {
        ...state,
        success: false,
        error: true,
        businesses: [],
        fetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
