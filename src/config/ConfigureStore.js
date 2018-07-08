import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export const redux_env =
  process.env.REACT_APP_REDUX_ENV === 'development'
    ? (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__())
    : {};

const configureStore = () => {
  // create store...
  const middleware = [thunk];
  const store = compose(applyMiddleware(...middleware))(createStore)(
    reducers,
    redux_env
  );
  return store;
};

export default configureStore();
