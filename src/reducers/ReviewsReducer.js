import {
  ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
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
    case ADD_REVIEW:
      return {
        ...state,
        success: true,
        error: false,
        loading: true,
        errors: {},
        message: action.message
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        loading: false,
        errors: {},
        message: action.message
      };
    case ADD_REVIEW_FAIL:
      return {
        ...state,
        success: false,
        error: true,
        loading: false,
        errors: action.errors,
        message: action.message
      };
    default:
      return state;
  }
}
