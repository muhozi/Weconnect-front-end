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
import { request, auth_request } from '../config';

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
      let resp = network_error(error);
      dispatch({
        type: ERROR,
        errors: resp.errors,
        message: resp.message
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
      console.log(response);
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
      let resp = network_error(error);
      dispatch({
        type: ERROR,
        errors: resp.errors,
        message: resp.message
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
      console.log(response);
      localStorage.removeItem('logged_in');
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth_user');
      dispatch({
        type: LOGOUT,
        data:
          response.data !== undefined
            ? response.data.message
            : 'Unknown response'
      });
    })
    .catch(error => {
      let resp = network_error(error);
      dispatch({
        type: ERROR,
        errors: resp.errors,
        message: resp.message
      });
    });
}

/** Request error handler function, Accept error error obj */
export const network_error = error => {
  if (error.response === undefined) {
    return {
      errors: {},
      message: error.message || 'Something went wrong'
    };
  } else {
    return {
      errors: error.response.data.errors || {},
      message: error.response.data.message || 'Something went wrong!'
    };
  }
};
