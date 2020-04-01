import { createReducer, on, Action } from '@ngrx/store';

import * as authActions from '../actions';

export interface LoadingState {
  registerLoading: boolean;
  loginLoading: boolean;
}

export const initialState: LoadingState = {
  registerLoading: false,
  loginLoading: false,
};

const AUTH_REDUCER = createReducer(
  initialState,
  on(authActions.registerUser, (state) => ({ ...state, registerLoading: true })),
  on(authActions.provideAdditionalData, (state) => ({ ...state, registerLoading: true })),
  on(authActions.registerUserSuccess, (state) => ({ ...state, registerLoading: false })),
  on(authActions.registerUserFail, (state) => ({ ...state, registerLoading: false })),
  on(authActions.loginUser, (state) => ({ ...state, loginLoading: true })),
  on(authActions.setUser, (state) => state),
  on(authActions.loginUserSuccess, (state) => ({ ...state, loginLoading: false })),
  on(authActions.loginUserFail, (state) => ({ ...state, loginLoading: false })),
);

export function authReducer(state: LoadingState | undefined, action: Action) {
  return AUTH_REDUCER(state, action);
}
