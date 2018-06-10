import { GET_MESSAGE } from './Constants.js';
import { store } from '../config';

export function get_message() {
  return (dispatch) => {
    const message = store.getState().message;
    dispatch({
      type: GET_MESSAGE,
    });
    return message;
  };
}