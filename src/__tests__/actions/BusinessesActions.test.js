import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { request } from '../../config';
import { getBusiness, getBusinesses } from '../../actions/BusinessesActions';

import {
  businessesResponse,
  singleBusinessResponse,
  invalidBusinessResponse
} from '../../mocks/ResponseMocks';
// import { registerDataMocks, loginDataMocks } from '../../mocks/DataMocks';

// Mock redux store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Test businesses actions', () => {
  beforeEach(() => {
    moxios.install(request);
  });
  afterEach(() => {
    moxios.uninstall(request);
  });

  /**
   * Test fetch business action
   */
  it('Test businesses fetch action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(businessesResponse);
    });
    const expectedActions = ['GET_BUSINESSES', 'GOT_BUSINESSES'];
    const store = mockStore();
    return store.dispatch(getBusinesses()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });

  /**
   * Test retrieving invalid single business
   */
  it('Test invalid response action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(invalidBusinessResponse);
    });
    const expectedActions = ['GET_BUSINESS','BUSINESS_ERROR'];
    const store = mockStore();
    return store.dispatch(getBusiness('business_id')).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });

});
