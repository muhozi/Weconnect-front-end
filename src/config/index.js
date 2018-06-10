import axios from 'axios';
import store from './ConfigureStore.js';

export const api_url = 'http://localhost:5000/api/v1/';
export { store };
export const request = axios.create({
  baseURL: api_url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
/** Request instance with an Authorization token */
export const auth_request = () =>
  axios.create({
    baseURL: api_url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: store.getState().auth.token
    }
  });
