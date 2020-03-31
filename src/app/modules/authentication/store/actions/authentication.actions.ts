import { createAction, props } from '@ngrx/store';

import { IUser, IUserRegisterData } from '@core/interfaces';

export const registerUser = createAction('[User] Register', props<IUserRegisterData>());
export const provideAdditionalData = createAction('[User] Provide additional data', props<IUser>());
export const registerUserSuccess = createAction('[User] Register success');
export const registerUserFail = createAction('[User] Register fail');

