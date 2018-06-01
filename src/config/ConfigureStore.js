import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const configureStore = () => {
  // create store...
  const middleware = [thunk];
  const store = compose(applyMiddleware(...middleware))(createStore)(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

export default configureStore();
