import {
  GOT_BUSINESSES,
  GET_BUSINESSES,
  BUSINESSES_ERROR,
  GOT_BUSINESS,
  GET_BUSINESS,
  BUSINESS_ERROR,
  SEARCH_BUSINESS,
  SEARCH_BUSINESS_RESULT,
  SEARCH_BUSINESS_ERROR
} from './Constants';
import { network_error } from './index';
import { request } from '../config';

/**
 * Fetch businesses
 */
export const getBusinesses = page => {
  return dispatch => {
    dispatch({ type: GET_BUSINESSES });
    return request
      .get('/businesses', { params: { page: page } })
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
};
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

/**
 *
 * @param {string} query - Search query
 * @param {object} filters - Filters
 */
export function searchBusiness(query, filters) {
  return dispatch => {
    const params = {};
    if (filters.name) {
      params['name'] = query;
    }
    if (filters.category) {
      params['category'] = query;
    }
    if (filters.country) {
      params['country'] = query;
    }
    if (filters.city) {
      params['city'] = query;
    }
    if (filters.allSearch) {
      params['searchAll'] = filters.allSearch;
    }
    dispatch({ type: SEARCH_BUSINESS });
    return request
      .get('/businesses', { params })
      .then(response => {
        dispatch({
          type: SEARCH_BUSINESS_RESULT,
          data: response.data
        });
      })
      .catch(error => {
        let resp = dispatch(network_error(error));
        return dispatch({
          type: SEARCH_BUSINESS_ERROR,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
}
