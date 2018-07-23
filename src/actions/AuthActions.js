import history from '../config/history';
import {
  ERROR,
  REGISTER_SUCCESS,
  NO_TOKEN,
  CHECKING_TOKEN,
  LOGIN_SUCCESS,
  SUCCESS_TOKEN,
  LOGOUT
} from './Constants.js';
import { network_error } from './';
import { request, auth_request, removeToken } from '../config';

/**
 * Register function
 */
export function register(data) {
  return dispatch => {
    const { username, email, password, confirm_password } = data;
    return request
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
        let resp = dispatch(network_error(error));
        dispatch({
          type: ERROR,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
}

/**
 * Login
 */
export function login(data) {
  return dispatch => {
    const { email, password } = data;
    return request
      .post('/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('logged_in', true);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('auth_user', JSON.stringify(response.data.user));
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
          data: response.data
        });
      })
      .catch(error => {
        let resp = dispatch(network_error(error));
        dispatch({
          type: ERROR,
          errors: resp.errors,
          message: resp.message
        });
      });
  };
}
/**
 * Check token
 */
export function checkToken(dispatch) {
  dispatch({
    type: CHECKING_TOKEN
  });
  try {
    let user = localStorage.getItem('auth_user');
    JSON.parse(user);
  } catch (error) {
    removeToken();
    return dispatch({
      type: LOGOUT,
      data: 'Invalid access token'
    });
  }
  let token = localStorage.getItem('access_token');
  let authenticated = localStorage.getItem('logged_in');
  let user = localStorage.getItem('auth_user');
  if (token !== null && authenticated === 'true' && user !== null) {
    return dispatch({
      type: SUCCESS_TOKEN,
      data: { access_token: token, user: JSON.parse(user) }
    });
  } else {
    localStorage.clear();
    return dispatch({
      type: NO_TOKEN
    });
  }
}

/** Logout method */
export function logout(dispatch) {
  auth_request()
    .post('/auth/logout', {})
    .then(response => {
      removeToken();
      dispatch({
        type: LOGOUT,
        data:
          response.data !== undefined
            ? response.data.message
            : 'Unknown response'
      });
    })
    .catch(error => {
      let resp = dispatch(network_error(error));
      if (resp.status === 401) {
        removeToken();
        dispatch({
          type: LOGOUT,
          data: resp.data !== undefined ? resp.message : 'Unknown response'
        });
      }
      dispatch({
        type: ERROR,
        errors: resp.errors,
        message: resp.message
      });
    });
}
