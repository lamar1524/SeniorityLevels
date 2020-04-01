import { AuthState } from '@modules/authentication/store';

export const selectRegisterLoading = (state: AuthState) => state.auth.registerLoading;
export const selectLoginLoading = (state: AuthState) => state.auth.loginLoading;
