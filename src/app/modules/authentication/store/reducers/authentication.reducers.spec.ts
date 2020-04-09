import { authReducer } from '@modules/authentication/store';
import * as authActions from '../actions';

describe('Authentication reducer', () => {
  it('should change registerLoading in state', () => {
    const expected = { registerLoading: true, loginLoading: false, userLogged: null };
    expect(authReducer(undefined, authActions.registerUser)).toEqual(expected);
  });

  it('should change registerLoading in state', () => {
    const expected = { registerLoading: false, loginLoading: false, userLogged: null };
    expect(authReducer(undefined, authActions.registerUserSuccess)).toEqual(expected);
  });

  it('should change registerLoading in state', () => {
    const expected = { registerLoading: false, loginLoading: false, userLogged: null };
    expect(authReducer(undefined, authActions.registerUserFail)).toEqual(expected);
  });
});
