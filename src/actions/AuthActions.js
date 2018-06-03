import history from '../config/history';
import {
  ERROR,
  REGISTER_SUCCESS,
  NO_TOKEN,
  CHECKING_TOKEN,
  LOGIN_SUCCESS,
  SUCCESS_TOKEN
} from './Constants.js';
import { request } from '../config';
/**
 * Register function
 */
export function register(dispatch, data) {
  const { username, email, password, confirm_password } = data;
  request
    .post('/auth/register', { username, email, password, confirm_password })
    .then(response => {
      dispatch({
        type: REGISTER_SUCCESS,
        errors: [],
        message:
          response.data !== undefined
            ? response.data.message
            : 'Unknown response'
      });
      history.push('/login');
    })
    .catch(error => {
      dispatch({
        type: ERROR,
        errors: error.response !== undefined ? error.response.data.errors : {},
        message:
          error.response !== undefined
            ? error.response.data.message
            : error.message
      });
    });
}
/**
 * Login
 */
export function login(dispatch, data) {
  const { email, password } = data;
  request
    .post('/auth/login', { email, password })
    .then(response => {
      localStorage.setItem('logged_in', true);
      localStorage.setItem('access_token', response.data.access_token);
      dispatch({
        type: LOGIN_SUCCESS,
        errors: [],
        message:
          response.data !== undefined
            ? response.data.message
            : 'Unknown response'
      });
      dispatch({
        type: SUCCESS_TOKEN,
        data: response.data.access_token,
      });
    })
    .catch(error => {
      dispatch({
        type: ERROR,
        errors:
          error.response.errors !== undefined ? error.response.data.errors : {},
        message:
          error.response !== undefined
            ? error.response.data.message
            : error.message
      });
    });
}
/**
 * Check token
 */
export function checkToken(dispatch) {
  dispatch({
    type: CHECKING_TOKEN
  });
  let token = localStorage.getItem('access_token');
  // let authenticated = localStorage.getItem('authenticated');
  if (localStorage.getItem('access_token') != null) {
    console.log(token);
    return dispatch({
      type: SUCCESS_TOKEN,
      data: token
    });
  } else {
    return dispatch({
      type: NO_TOKEN
    });
  }
}
