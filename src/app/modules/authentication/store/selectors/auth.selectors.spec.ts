import { IBasicUser } from '@core/interfaces';
import { AuthModuleState } from '../reducers';
import * as selectors from './auth.selectors';

describe('Auth selectors', () => {
  const loadedState = {
    auth: {
      registerLoading: false,
      loginLoading: false,
      userLogged: { uid: '' } as IBasicUser,
    },
  } as AuthModuleState;

  it('selecting RegisterLoading', () => {
    expect(selectors.selectRegisterLoading(loadedState)).toBeFalsy();
  });

  it('selecting LoginLoading', () => {
    expect(selectors.selectLoginLoading(loadedState)).toBeFalsy();
  });

  it('selecting current User', () => {
    expect(selectors.selectCurrentUser(loadedState)).toEqual({ uid: '' } as IBasicUser);
  });
});
