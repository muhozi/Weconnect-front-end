import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { network_error } from '../../actions';
import {
  unauthorizedResponse,
  unauthorizedLoginResponse,
  networkErrorResponse
} from '../../mocks/ResponseMocks';

// Mock redux store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

/**
 * Test get message action
 */

describe('Test network exceptions', () => {
  it('Test 401', done => {
    const expectedActions = ['LOGOUT'];
    const store = mockStore();
    store.dispatch(network_error(unauthorizedResponse));
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(actionTypes).toEqual(expectedActions);
    done();
  });
  it('Test 401 for login', done => {
    const expectedActions = ['ERROR'];
    const store = mockStore();
    store.dispatch(network_error(unauthorizedLoginResponse));
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(actionTypes).toEqual(expectedActions);
    done();
  });
  it('Test 401 for login', done => {
    const expectedResponse = {
      errors: {},
      message: 'Network error'
    };
    const store = mockStore();
    const response = store.dispatch(network_error(networkErrorResponse));
    expect(response).toEqual(expectedResponse);
    done();
  });
});
