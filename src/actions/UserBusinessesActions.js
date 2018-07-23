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
  CANCEL_EDIT_BUSINESS
} from './Constants.js';
import { network_error } from './';
import { auth_request } from '../config';
import { getBusiness } from './BusinessesActions';

/** Get user businesses action method */
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
 * Register Business function
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
 * Update Business function
 */
export function updateBusiness(data) {
  return dispatch => {
    const { name, category, description, country, city, business_id } = data;
    dispatch({ type: UPDATE_BUSINESS });
    auth_request()
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
export const editBusiness = state =>
  state ? { type: EDIT_BUSINESS } : { type: CANCEL_EDIT_BUSINESS };
