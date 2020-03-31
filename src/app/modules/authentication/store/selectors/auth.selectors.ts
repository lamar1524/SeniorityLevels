import { AuthState } from '@modules/authentication/store';

export const selectRegisterLoading = (state: AuthState) => state.auth.registerLoading;
