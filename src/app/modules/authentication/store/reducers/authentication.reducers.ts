import { createReducer, on, Action } from '@ngrx/store';
import { User } from 'firebase';

import * as authActions from '../actions';

export interface AuthModuleState {
  auth: AuthState;
}

export interface AuthState {
  registerLoading: boolean;
  loginLoading: boolean;
  userLogged: User;
}

export const initialState: AuthState = {
  registerLoading: false,
  loginLoading: false,
  userLogged: null,
};

const AUTH_REDUCER = createReducer(
  initialState,
  on(authActions.registerUser, (state) => ({ ...state, registerLoading: true })),
  on(authActions.provideAdditionalData, (state) => ({ ...state, registerLoading: true })),
  on(authActions.registerUserSuccess, (state) => ({ ...state, registerLoading: false })),
  on(authActions.registerUserFail, (state) => ({ ...state, registerLoading: false })),
  on(authActions.loginUser, (state) => ({ ...state, loginLoading: true })),
  on(authActions.loginUserSuccess, (state, { user }) => ({ ...state, loginLoading: false, userLogged: user })),
  on(authActions.loginUserFail, () => ({ ...initialState })),
  on(authActions.clearUser, () => ({ ...initialState })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return AUTH_REDUCER(state, action);
}
