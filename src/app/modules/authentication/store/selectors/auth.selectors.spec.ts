import { AuthModuleState } from '@modules/authentication/store';
import { User } from 'firebase';
import * as selectors from './auth.selectors';

describe('Auth selectors', () => {
  const loadedState = {
    auth: {
      registerLoading: false,
      loginLoading: false,
      userLogged: { uid: '' } as User,
    },
  } as AuthModuleState;

  it('selecting RegisterLoading', () => {
    expect(selectors.selectRegisterLoading(loadedState)).toBeFalsy();
  });

  it('selecting LoginLoading', () => {
    expect(selectors.selectLoginLoading(loadedState)).toBeFalsy();
  });

  it('selecting current User', () => {
    expect(selectors.selectCurrentUser(loadedState)).toEqual({ uid: '' } as User);
  });
});
