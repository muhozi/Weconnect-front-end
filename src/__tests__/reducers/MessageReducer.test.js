import reducer from '../../reducers/MessageReducer';
import * as types from '../../actions/Constants';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      message: '',
      errors: {},
      loading: false,
      success: false,
      error: false
    });
  });

  it('should handle REGISTER_SUCCESS', () => {
    expect(
      reducer(
        {},
        {
          type: types.REGISTER_SUCCESS,
          errors: [],
          message: 'You have been successfully registered'
        }
      )
    ).toEqual({
      error: false,
      errors: {},
      loading: false,
      message: 'You have been successfully registered',
      register_success: true,
      success: true
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer(
        {},
        {
          type: types.LOGIN_SUCCESS,
          errors: [],
          message: 'You have been successfully logged in',
          login_success: true
        }
      )
    ).toEqual({
      error: false,
      errors: {},
      loading: false,
      login_success: true,
      message: 'You have been successfully logged in',
      success: true
    });
  });

  it('should handle LOGOUT', () => {
    expect(
      reducer(
        {},
        {
          type: types.LOGOUT,
          data: 'You have successfully logged out'
        }
      )
    ).toEqual({
      error: false,
      errors: {},
      logout_success: true,
      message: 'You have successfully logged out',
      success: true
    });
  });
});
