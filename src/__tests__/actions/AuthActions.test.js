import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { api_url, request, auth_request } from '../../config';
import {
  register,
  login,
  logout,
  reset,
  changePassword,
  confirmEmail,
  checkToken
} from '../../actions/AuthActions';
import {
  successRegisterResponse,
  registerFailResponse,
  successLoginResponse,
  loginFailResponse,
  logoutResponse,
  resetPasswordResponse,
  invalidResetPasswordResponse,
  changePasswordResponse,
  invalidChangePasswordResponse,
  confirmEmailResponse,
  invalidConfirmEmailResponse
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
    moxios.install(request);
  });
  afterEach(() => {
    moxios.uninstall(request);
  });
  /** Test reset password action */
  it('Test reset password action', done => {
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

/**
 * Test change password action
 */
describe('Test change password', () => {
  beforeEach(() => {
    moxios.install(request);
  });
  afterEach(() => {
    moxios.uninstall(request);
  });
  it('Test change password action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(changePasswordResponse);
    });
    const expectedActions = ['RESET_SUCCESS'];
    const store = mockStore();
    return store
      .dispatch(
        changePassword({
          email: 'john@gmail.com',
          password: '123456',
          confirm_password: '123456'
        })
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        done();
      });
  });
  it('Test invalid change password', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(invalidChangePasswordResponse);
    });
    const expectedActions = ['ERROR'];
    const store = mockStore();
    return store
      .dispatch(
        changePassword({
          email: 'john@gmail.com',
          password: '123456',
          confirm_password: '123456'
        })
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        done();
      });
  });
});

/**
 * Check confirm email action
 */

describe('Test Confirm email', () => {
  beforeEach(() => {
    moxios.install(request);
  });
  afterEach(() => {
    moxios.uninstall(request);
  });
  /** Test Confirm email action */
  it('Test Confirm email action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(confirmEmailResponse);
    });
    const expectedActions = ['RESET_SUCCESS'];
    const store = mockStore();
    return store
      .dispatch(
        confirmEmail({
          email: 'john@gmail.com'
        })
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        done();
      });
  });
  it('Test invalid Confirm email', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(invalidConfirmEmailResponse);
    });
    const expectedActions = ['ERROR'];
    const store = mockStore();
    return store
      .dispatch(
        confirmEmail({
          email: 'john@gmail.com'
        })
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        done();
      });
  });
});

/**
 * Test checking token action
 */

describe('Test checking token action', () => {
  beforeEach(() => {
    moxios.install(request);
  });
  afterEach(() => {
    moxios.uninstall(request);
  });
  it('Test token chek action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(successLoginResponse);
    });
    const expectedActions = [
      'LOGIN_SUCCESS',
      'SUCCESS_TOKEN',
      'CHECKING_TOKEN',
      'SUCCESS_TOKEN'
    ];
    const store = mockStore();
    // Login and check token
    store.dispatch(login(loginDataMocks)).then(() => {
      store.dispatch(checkToken());
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });

  it('Test token checking action with empty localstorage', done => {
    localStorage.clear();
    const expectedActions = ['CHECKING_TOKEN', 'NO_TOKEN'];
    const store = mockStore();
    store.dispatch(checkToken());
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(actionTypes).toEqual(expectedActions);
    done();
  });
});
