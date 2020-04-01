import { createAction, props } from '@ngrx/store';

import { IUser, IUserRegisterData } from '@core/interfaces';

export const registerUser = createAction('[User] Register', props<IUserRegisterData>());
export const provideAdditionalData = createAction('[User] Provide additional data', props<IUser>());
export const registerUserSuccess = createAction('[User] Register success');
export const registerUserFail = createAction('[User] Register fail');

export const loginUser = createAction('[User] Login', props<{ email: string; password: string }>());
export const setUser = createAction('[User] Set logged');
export const loginUserSuccess = createAction('[User] Login success');
export const loginUserFail = createAction('[User] Login fail');
