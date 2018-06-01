import {
  ERROR,
  REGISTER_SUCCESS,
} from './Constants.js';
import { request } from '../config';
/**
  * Register function
  * @param {function} dispatch - Dispacth function
  * @param {object} data - User data object
*/
export function register(dispatch, data) {
  const { username, email, password, confirm_password } = data;
  request
    .post('/auth/register', { username, email, password, confirm_password })
    .then(response =>
      dispatch({
        type: REGISTER_SUCCESS,
        errors: [],
        message:
          response.data !== undefined
            ? response.data.message
            : 'Unknown response'
      })
    )
    .catch(error => {
      dispatch({
        type: ERROR,
        errors: error.response !== undefined ? error.response.data.errors : {},
        message:
          (error.response !== undefined)
            ? error.response.data.message
            : error.message
      });
    });
}
