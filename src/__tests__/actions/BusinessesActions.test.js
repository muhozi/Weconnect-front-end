import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { request } from '../../config';
import {
  getBusiness,
  getBusinesses,
  searchBusiness
} from '../../actions/BusinessesActions';

import {
  businessesResponse,
  singleBusinessResponse,
  invalidBusinessResponse,
  invalidBusinessesResponse
} from '../../mocks/ResponseMocks';

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
    const expectedActions = ['GET_BUSINESS', 'BUSINESS_ERROR'];
    const store = mockStore();
    return store.dispatch(getBusiness('business_id')).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  it('Test get single business action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(singleBusinessResponse);
    });
    const expectedActions = ['GET_BUSINESS', 'GOT_BUSINESS'];
    const store = mockStore();
    return store.dispatch(getBusiness('business_id')).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  it('Test search business action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(businessesResponse);
    });
    const expectedActions = ['SEARCH_BUSINESS', 'SEARCH_BUSINESS_RESULT'];
    const store = mockStore();
    return store
      .dispatch(
        searchBusiness('inzora', {
          name: true,
          country: true,
          category: true,
          city: true,
          allSearch: true
        })
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        done();
      });
  });
  it('Test invalid search business action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(invalidBusinessesResponse);
    });
    const expectedActions = ['SEARCH_BUSINESS', 'SEARCH_BUSINESS_ERROR'];
    const store = mockStore();
    return store
      .dispatch(
        searchBusiness('inzora', {})
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        done();
      });
  });
});
