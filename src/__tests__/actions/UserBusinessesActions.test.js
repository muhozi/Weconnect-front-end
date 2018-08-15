import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { request } from '../../config';
import {
  getMyBusinesses,
  deleteBusiness,
  registerBusiness,
  updateBusiness,
  addReview,
  editBusiness
} from '../../actions/UserBusinessesActions';
import {
  businessesResponse,
  singleBusinessResponse,
  invalidBusinessResponse,
  businessRegistrationResponse,
  businessUpdateResponse,
  businessInvalidUpdateResponse,
  businessDeleteResponse,
  businessDeleteInvalidResponse,
  addReviewResponse,
  invalidAddReviewResponse,
  invalidBusinessRegisterResponse
} from '../../mocks/ResponseMocks';
import { businessDataMocks } from '../../mocks/DataMocks';

// Mock redux store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Test businesses actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  /**
   * Test fetch user business action
   */
  it('Fetches user businesses', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(businessesResponse);
    });
    const expectedActions = ['GET_MY_BUSINESSES', 'GOT_MY_BUSINESSES'];
    const store = mockStore();
    return store.dispatch(getMyBusinesses()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  it('Test invalid businesses response handler action', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(invalidBusinessResponse);
    });
    const expectedActions = ['GET_MY_BUSINESSES', 'MY_BUSINESSES_ERROR'];
    const store = mockStore();
    return store.dispatch(getMyBusinesses('business_id')).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  /**
   * Test registering business action
   */
  it('Registers business', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(businessRegistrationResponse);
    });
    const expectedActions = ['REGISTER_BUSINESS', 'REGISTER_BUSINESS_SUCCESS'];
    const store = mockStore();
    return store.dispatch(registerBusiness(businessDataMocks)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  it('Fails to registers business', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(invalidBusinessRegisterResponse);
    });
    const expectedActions = ['REGISTER_BUSINESS', 'REGISTER_BUSINESS_ERROR'];
    const store = mockStore();
    return store.dispatch(registerBusiness(businessDataMocks)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });

  it('Switches edit action types', done => {
    const expectedReturn = { type: 'EDIT_BUSINESS' };
    const toReturn = editBusiness(true);
    expect(expectedReturn).toEqual(toReturn);
    done();
  });

  /**
   * Test update business action
   */
  it('Updates business', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(businessUpdateResponse);
    });
    const expectedActions = [
      'UPDATE_BUSINESS',
      'UPDATE_BUSINESS_SUCCESS',
      'DISMISS_UPDATE_BUSINESS_MESSAGE',
      'CANCEL_EDIT_BUSINESS',
      'GET_BUSINESS'
    ];
    const store = mockStore();
    return store.dispatch(updateBusiness(businessDataMocks)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });

  /**
   * Test invalid business update action
   */
  it("Doesn't update business", done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(businessInvalidUpdateResponse);
    });
    const expectedActions = ['UPDATE_BUSINESS', 'UPDATE_BUSINESS_ERROR'];
    const store = mockStore();
    return store.dispatch(updateBusiness(businessDataMocks)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });

  /**
   * Test registering business action
   */
  it('Deletes business', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(businessDeleteResponse);
    });
    const expectedActions = ['DELETING_BUSINESS', 'BUSINESS_DELETED'];
    const store = mockStore();
    return store.dispatch(deleteBusiness('business_id')).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  /**
   * Test deleting invalid business
   */
  it('Can not delete invalid business', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(businessDeleteInvalidResponse);
    });
    const expectedActions = ['DELETING_BUSINESS', 'DELETE_ERROR'];
    const store = mockStore();
    return store.dispatch(deleteBusiness('business_id')).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });
  it('Test add review', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(addReviewResponse);
    });
    const expectedActions = [
      'ADD_REVIEW',
      'ADD_REVIEW_SUCCESS',
      'ADDED_REVIEW'
    ];
    const store = mockStore();
    return store
      .dispatch(addReview({ business_id: 1, review: 'Nice' }))
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        done();
      });
  });
  it('Test invalid add review', done => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith(invalidAddReviewResponse);
    });
    const expectedActions = ['ADD_REVIEW', 'ADD_REVIEW_FAIL'];
    const store = mockStore();
    return store
      .dispatch(addReview({ business_id: 1, review: 'Nice' }))
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        done();
      });
  });
});
