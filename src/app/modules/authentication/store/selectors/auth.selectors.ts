import { AuthModuleState } from '@modules/authentication/store';

export const selectRegisterLoading = (state: AuthModuleState) => state.auth.registerLoading;
export const selectLoginLoading = (state: AuthModuleState) => state.auth.loginLoading;
