import moxios from 'moxios';
import { register } from '../../actions/AuthActions';
import thunk from 'redux-thunk';
import { api_url, request } from '../../config';
import configureMockStore from 'redux-mock-store';
describe('Test auth actions', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  beforeEach(() => {
    moxios.install(request);
  });
  afterEach(() => {
    moxios.uninstall(request);
  });
  it('it dispatches ', done => {
    const payload = {
      status: 'ok',
      message: 'You have been successfully registered'
    };
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        data: payload
      });
    });
    const expectedActions = ['REGISTER_SUCCESS'];
    const data = {
      username: 'muhozi',
      email: 'muhozie@gmail.com',
      password: '123456',
      confirm_password: '123456'
    };
    const store = mockStore({});
    // register(store.dispatch, data);
    // const dispatchedActions = store.getActions();
    // console.log(dispatchedActions);
    // const actionTypes = dispatchedActions.map(action => action.type);
    return store.dispatch(register(data)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
});
