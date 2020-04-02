import { createSelector } from '@ngrx/store';

import { AuthModuleState, AuthState } from '../reducers';

export const authSelector = (state: AuthModuleState) => state.auth;

export const selectRegisterLoading = createSelector(authSelector, (state: AuthState) => state.registerLoading);
export const selectLoginLoading = createSelector(authSelector, (state: AuthState) => state.loginLoading);
export const selectCurrentUser = createSelector(authSelector, (state: AuthState) => state.userLogged);
