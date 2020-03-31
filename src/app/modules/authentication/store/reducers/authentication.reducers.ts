import { createReducer, on, Action } from '@ngrx/store';

import * as authActions from '../actions';

export interface LoadingState {
  registerLoading: boolean;
}

export const initialState: LoadingState = {
  registerLoading: false,
};

const AUTH_REDUCER = createReducer(
  initialState,
  on(authActions.registerUser, (state) => ({ ...state, registerLoading: true })),
  on(authActions.provideAdditionalData, (state) => ({ ...state, registerLoading: true })),
  on(authActions.registerUserSuccess, (state) => ({ ...state, registerLoading: false })),
  on(authActions.registerUserFail, (state) => ({ ...state, registerLoading: false })),
);

export function authReducer(state: LoadingState | undefined, action: Action) {
  return AUTH_REDUCER(state, action);
}
