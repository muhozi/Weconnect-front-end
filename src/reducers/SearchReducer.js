import {
  SEARCH_BUSINESS,
  SEARCH_BUSINESS_RESULT,
  SEARCH_BUSINESS_ERROR
} from '../actions/Constants';

const initialState = {
  success: false,
  error: false,
  businesses: [],
  message: '',
  fetching: false
};
/**
 * Search businesses reducer
 */
export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BUSINESS:
      return {
        ...state,
        success: false,
        error: false,
        businesses: [],
        fetching: true,
        message: 'Searching businesses ...'
      };
    case SEARCH_BUSINESS_RESULT:
      return {
        ...state,
        success: true,
        error: false,
        businesses: action.data.businesses || [],
        fetching: false,
        message: action.data.message
      };
    case SEARCH_BUSINESS_ERROR:
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
