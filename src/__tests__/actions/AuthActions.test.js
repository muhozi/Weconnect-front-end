import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { api_url, request, auth_request } from '../../config';
import { register, login, logout } from '../../actions/AuthActions';
import {
  successRegisterResponse,
  registerFailResponse,
  successLoginResponse,
  loginFailResponse
} from '../../mocks/ResponseMocks';
import { registerDataMocks, loginDataMocks } from '../../mocks/DataMocks';

// Mock redux store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Test auth actions', () => {
  beforeEach(() => {
    moxios.install(request);
  });
  afterEach(() => {
    moxios.uninstall(request);
  });
  /** Test register action */
  it('Test if it dispatches register success', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(successRegisterResponse);
    });
    const expectedActions = ['REGISTER_SUCCESS'];
    const store = mockStore();
    return store.dispatch(register(registerDataMocks)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  /** Test registration exception acion */
  it('Test if it dispatches registration error', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(registerFailResponse);
    });
    const expectedActions = ['ERROR'];
    const store = mockStore();
    return store.dispatch(register(registerDataMocks)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  /** Test login acion */
  it('Test login action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(successLoginResponse);
    });
    const expectedActions = ['LOGIN_SUCCESS', 'SUCCESS_TOKEN'];
    const store = mockStore();
    return store.dispatch(login(loginDataMocks)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  it('Test invalid login action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(loginFailResponse);
    });
    const expectedActions = ['ERROR'];
    const store = mockStore();
    return store.dispatch(login(loginDataMocks)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
});
