import { LOGOUT, ERROR } from './Constants.js';
import { removeToken } from '../config';
/** Request error handler function, Accept error error obj */
export const network_error = (dispatch, error) => {
  let invalidMsg = error.response.data.message || 'Invalid token';
  console.log(invalidMsg);
  if (error.response === undefined) {
    return {
      errors: {},
      message: error.message || 'Something went wrong'
    };
  } else if (
    error.response.status === 401 &&
    invalidMsg.indexOf('Unauthorized') > 0
  ) {
    removeToken();
    return dispatch({
      type: LOGOUT,
      data: 'Invalid token'
    });
  } else if (
    error.response.status === 401 &&
    !invalidMsg.indexOf('Unauthorized')
  ) {
    return dispatch({
      type: ERROR,
      errors: {},
      message: invalidMsg
    });
  } else {
    return {
      status: error.response.status || '',
      errors: error.response.data.errors || {},
      message: error.response.data.message || 'Something went wrong!'
    };
  }
};
