import {
  GOT_BUSINESSES,
  GET_BUSINESSES,
  BUSINESSES_ERROR,
  GOT_BUSINESS,
  GET_BUSINESS,
  BUSINESS_ERROR
} from './Constants.js';
import { network_error } from './index';
import { request } from '../config';

/** Get businesses method */
export function getBusinesses(dispatch) {
  dispatch({ type: GET_BUSINESSES });
  request
    .get('/businesses', {})
    .then(response => {
      dispatch({
        type: GOT_BUSINESSES,
        data: response.data
      });
    })
    .catch(error => {
      let resp = network_error(dispatch, error);
      dispatch({
        type: BUSINESSES_ERROR,
        errors: resp.errors,
        message: resp.message
      });
    });
}
export function getBusiness(dispatch, business_id) {
  dispatch({ type: GET_BUSINESS });
  request
    .get('/businesses/' + business_id + '/reviews')
    .then(response =>
      dispatch({
        type: GOT_BUSINESS,
        data: response.data
      })
    )
    .catch(error => {
      let resp = network_error(dispatch, error);
      return dispatch({
        type: BUSINESS_ERROR,
        errors: resp.errors,
        message: resp.message
      });
    });
}
