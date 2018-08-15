import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { api_url, request, auth_request } from '../../config';
import { register, login, logout, reset } from '../../actions/AuthActions';
import {
  successRegisterResponse,
  registerFailResponse,
  successLoginResponse,
  loginFailResponse,
  logoutResponse,
  resetPasswordResponse,
  invalidResetPasswordResponse
} from '../../mocks/ResponseMocks';
import { registerDataMocks, loginDataMocks } from '../../mocks/DataMocks';

// Mock redux store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Test register action', () => {
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

/** Test logout action */
describe('Test logout actions', () => {
  let instance = auth_request();
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  /** Test register action */
  it('Test invalid login action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(logoutResponse);
    });
    const expectedActions = ['LOGOUT'];
    const store = mockStore();
    return store.dispatch(logout(loginDataMocks)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
});

describe('Test reset password', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  /** Test reset password action */
  it('Test invalid login action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(resetPasswordResponse);
    });
    const expectedActions = ['RESET_SUCCESS'];
    const store = mockStore();
    return store.dispatch(reset('john@gmail.com')).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  it('Test invalid reset password', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(invalidResetPasswordResponse);
    });
    const expectedActions = ['ERROR'];
    const store = mockStore();
    return store.dispatch(reset('mom@gmail.com')).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
});
