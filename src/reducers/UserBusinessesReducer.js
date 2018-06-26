import {
  GET_MY_BUSINESSES,
  GOT_MY_BUSINESSES,
  MY_BUSINESSES_ERROR,
  MY_BUSINESSES_PAGE
} from '../actions/Constants';

const initialState = {
  success: false,
  error: false,
  businesses: [],
  message: '',
  fetching: false,
};
/**
 * Businesses reducers
 */
export default function BusinessesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_BUSINESSES:
      return {
        ...state,
        success: false,
        error: false,
        businesses: [],
        fetching: true,
        message: 'Loading businesses ...'
      };
    case GOT_MY_BUSINESSES:
      return {
        ...state,
        success: true,
        error: false,
        businesses: action.data.businesses,
        fetching: false,
        message: action.data.message,
        next_page: action.data.next_page || null,
        previous_page: action.data.previous_page || null,
        current_page: action.data.current_page || null,
        pages: action.data.pages || null,
        total_businesses: action.data.total_businesses || null
      };
    case MY_BUSINESSES_PAGE:
      return {
        ...state,
        current_page: action.data.page || 1
      };
    case MY_BUSINESSES_ERROR:
      return {
        ...state,
        success: false,
        error: true,
        businesses: action.data.businesses,
        fetching: false,
        message: action.data.message
      };
    default:
      return state;
  }
}
