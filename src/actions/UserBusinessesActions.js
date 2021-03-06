import history from '../config/history';
import {
  GOT_MY_BUSINESSES,
  GET_MY_BUSINESSES,
  MY_BUSINESSES_ERROR,
  DELETING_BUSINESS,
  BUSINESS_DELETED,
  DELETE_ERROR,
  REGISTER_BUSINESS,
  REGISTER_BUSINESS_SUCCESS,
  REGISTER_BUSINESS_ERROR,
  UPDATE_BUSINESS,
  UPDATE_BUSINESS_SUCCESS,
  UPDATE_BUSINESS_ERROR,
  DISMISS_UPDATE_BUSINESS_MESSAGE,
  EDIT_BUSINESS,
  CANCEL_EDIT_BUSINESS,
  ADD_REVIEW,
  ADD_REVIEW_FAIL,
  ADD_REVIEW_SUCCESS,
  ADDED_REVIEW
} from './Constants';
import { network_error } from './';
import { auth_request } from '../config';
import { getBusiness } from './BusinessesActions';

/**
 * Retrieve user businesses on certain page
 * @param {number} page
 */
export const getMyBusinesses = page => {
  return dispatch => {
    dispatch({ type: GET_MY_BUSINESSES });
    return auth_request()
      .get('/account/businesses', { params: { page: page } })
      .then(response => {
        dispatch({
          type: GOT_MY_BUSINESSES,
          data: response.data
        });
      })
      .catch(error => {
        let resp = dispatch(network_error(error));
        dispatch({
          type: MY_BUSINESSES_ERROR,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
};

/**
 * Delete business
 * @param {string} business_id
 */
export const deleteBusiness = business_id => {
  return dispatch => {
    dispatch({ type: DELETING_BUSINESS });
    return auth_request()
      .delete('/businesses/' + business_id, {})
      .then(response => {
        dispatch({ type: BUSINESS_DELETED, message: response.data.message });
        history.push('/account/businesses');
      })
      .catch(error => {
        let resp = dispatch(network_error(error));
        dispatch({
          type: DELETE_ERROR,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
};

/**
 * Register business action
 * @param {Object} data
 */
export function registerBusiness(data) {
  return dispatch => {
    const { name, category, description, country, city } = data;
    dispatch({ type: REGISTER_BUSINESS });
    return auth_request()
      .post('/businesses', { name, category, description, country, city })
      .then(response => {
        dispatch({
          type: REGISTER_BUSINESS_SUCCESS,
          errors: [],
          message:
            response.data !== undefined
              ? response.data.message
              : 'Unknown response'
        });
        history.push('/account/businesses');
      })
      .catch(error => {
        let resp = dispatch(network_error(error));
        dispatch({
          type: REGISTER_BUSINESS_ERROR,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
}

/**
 * Update the business
 * @param {Object} data
 */
export function updateBusiness(data) {
  return dispatch => {
    const { name, category, description, country, city, business_id } = data;
    dispatch({ type: UPDATE_BUSINESS });
    return auth_request()
      .put('/businesses/' + business_id, {
        name,
        category,
        description,
        country,
        city
      })
      .then(response => {
        dispatch({
          type: UPDATE_BUSINESS_SUCCESS,
          errors: [],
          message:
            response.data !== undefined
              ? response.data.message
              : 'Unknown response'
        });
        dispatch({ type: DISMISS_UPDATE_BUSINESS_MESSAGE });
        dispatch({ type: CANCEL_EDIT_BUSINESS });
        dispatch(getBusiness(business_id));
      })
      .catch(error => {
        let resp = dispatch(network_error(error));
        dispatch({
          type: UPDATE_BUSINESS_ERROR,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
}

/**
 * Add business Review
 * @param {data}
 */
export function addReview(data) {
  return dispatch => {
    const { review, business_id } = data;
    dispatch({ type: ADD_REVIEW });
    return auth_request()
      .post('/businesses/' + business_id + '/reviews', {
        review
      })
      .then(response => {
        dispatch({
          type: ADD_REVIEW_SUCCESS,
          errors: [],
          message:
            response.data !== undefined
              ? response.data.message
              : 'Unknown response'
        });
        dispatch({
          type: ADDED_REVIEW,
          data: response.data.review
        });
      })
      .catch(error => {
        let resp = dispatch(network_error(error));
        dispatch({
          type: ADD_REVIEW_FAIL,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
}
/**
 * Switch the edit modal
 * @param {boolean} state
 */
export const editBusiness = state =>
  state ? { type: EDIT_BUSINESS } : { type: CANCEL_EDIT_BUSINESS };
