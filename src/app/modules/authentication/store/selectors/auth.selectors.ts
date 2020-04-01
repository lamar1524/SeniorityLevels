import { createSelector } from '@ngrx/store';

import { AuthModuleState } from '@modules/authentication/store';
import { AuthState } from '@modules/authentication/store/reducers';

export const authSelector = (state: AuthModuleState) => state.auth;

export const selectRegisterLoading = createSelector(authSelector, (state: AuthState) => state.registerLoading);
export const selectLoginLoading = createSelector(authSelector, (state: AuthState) => state.loginLoading);
