import {
  GET_BUSINESS,
  GOT_BUSINESS,
  BUSINESS_ERROR,
  DELETING_BUSINESS,
  BUSINESS_DELETED
} from '../actions/Constants';

const initialState = {
  success: false,
  error: false,
  business_id: {},
  business: {},
  reviews: [],
  fetching: true,
  message: 'Getting business',
  deleting: false,
};
/**
 * Businesses reducers
 */
export default function BusinessReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BUSINESS:
      return {
        ...state,
        success: false,
        error: false,
        business_id: {},
        business: {},
        reviews: [],
        fetching: true,
        message: 'Getting business'
      };
    case GOT_BUSINESS:
      return {
        ...state,
        success: false,
        error: false,
        business_id: action.data.business.id,
        details: action.data.business,
        reviews: action.data.reviews,
        fetching: false,
        message: action.data.message
      };
    case BUSINESS_ERROR:
      return {
        ...state,
        success: false,
        error: true,
        buisiness_id: '',
        details: {},
        reviews: [],
        fetching: false,
        message: action.message
      };
    case DELETING_BUSINESS:
      return {
        ...state,
        deleting: true
      };
    case BUSINESS_DELETED:
      return {
        ...state,
        deleting: false,
        delete_message: action.message
      };
    default:
      return state;
  }
}
