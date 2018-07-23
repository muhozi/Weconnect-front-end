import {
  GOT_BUSINESSES,
  GET_BUSINESSES,
  BUSINESSES_ERROR,
  GOT_BUSINESS,
  GET_BUSINESS,
  BUSINESS_ERROR
} from './Constants';
import { network_error } from './index';
import { request } from '../config';

/**
 * Fetch businesses
 */
export function getBusinesses() {
  return dispatch => {
    dispatch({ type: GET_BUSINESSES });
    return request
      .get('/businesses', {})
      .then(response => {
        dispatch({
          type: GOT_BUSINESSES,
          data: response.data
        });
      })
      .catch(error => {
        let resp = dispatch(network_error(error));
        dispatch({
          type: BUSINESSES_ERROR,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
}
/**
 * 
 * @param {string} business_id 
 */
export function getBusiness(business_id) {
  return dispatch => {
    dispatch({ type: GET_BUSINESS });
    return request
      .get('/businesses/' + business_id + '/reviews')
      .then(response =>
        dispatch({
          type: GOT_BUSINESS,
          data: response.data
        })
      )
      .catch(error => {
        let resp = dispatch(network_error(error));
        return dispatch({
          type: BUSINESS_ERROR,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
}
