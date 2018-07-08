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
  REGISTER_BUSINESS_ERROR
} from './Constants.js';
import { network_error } from './';
import { auth_request } from '../config';

/** Get user businesses action method */
export const getMyBusinesses = (dispatch, page) => {
  dispatch({ type: GET_MY_BUSINESSES });
  auth_request()
    .get('/account/businesses', { params: { page: page } })
    .then(response => {
      dispatch({
        type: GOT_MY_BUSINESSES,
        data: response.data
      });
    })
    .catch(error => {
      let resp = network_error(dispatch, error);
      dispatch({
        type: MY_BUSINESSES_ERROR,
        errors: resp.errors,
        message: resp.message
      });
    });
};
export const deleteBusiness = (dispatch, business_id) => {
  dispatch({ type: DELETING_BUSINESS });
  auth_request()
    .delete('/businesses/' + business_id, {})
    .then(response => {
      dispatch({ type: BUSINESS_DELETED, message: response.data.message });
      history.push('/account/businesses');
    })
    .catch(error => {
      let resp = network_error(dispatch, error);
      dispatch({
        type: DELETE_ERROR,
        errors: resp.errors,
        message: resp.message
      });
    });
};
/**
 * Register Business function
 */
export function registerBusiness(dispatch, data) {
  const { name, category, description, country, city } = data;
  dispatch({ type: REGISTER_BUSINESS });
  auth_request()
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
      let resp = network_error(dispatch, error);
      dispatch({
        type: REGISTER_BUSINESS_ERROR,
        errors: resp.errors,
        message: resp.message
      });
    });
}
