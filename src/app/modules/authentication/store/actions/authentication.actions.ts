import { createAction, props } from '@ngrx/store';

import { IBasicUser, IUser, IUserRegisterData } from '@core/interfaces';

export const registerUser = createAction('[Auth] Register', props<IUserRegisterData>());
export const provideAdditionalData = createAction('[Auth] Provide additional data', props<IUser>());
export const registerUserSuccess = createAction('[Auth] Register success');
export const registerUserFail = createAction('[Auth] Register fail');

export const loginUser = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loadUserLogin = createAction('[Auth] Set logged');
export const loginUserSuccess = createAction('[Auth] Login success', props<{ user: IBasicUser }>());
export const loginUserFail = createAction('[Auth] Login fail');
export const clearUser = createAction('[Auth] Clear');

export const loadUserRefresh = createAction('[Auth] Load user');
