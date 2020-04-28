import { createAction, props } from '@ngrx/store';

import { roleEnum } from '@core/enums/role.enum';
import { ISeniorityCount, ISubCategoryValue, IUser, IUserValues } from '@core/interfaces';

export const loadTotalProgress = createAction('[Users] Load skills', props<{ userId: string }>());
export const computeTotalProgressSuccess = createAction('[Users] Loading progress success', props<{ values: ISeniorityCount }>());
export const computeTotalProgressFail = createAction('[Users] Loading progress failed');

export const loadOtherUserDetails = createAction('[Users] Load other user', props<{ userId: string }>());
export const loadOtherUserDetailsFail = createAction('[Users] Load other user fail');
export const loadOtherUserSuccess = createAction('[Users] Load other user success', props<{ user: IUserValues }>());

export const loadSkillsWithTitles = createAction('[Users] Load users skills with titles', props<{ userId: string }>());
export const loadSkillsWithTitlesSuccess = createAction(
  '[Users] Load users skills with titles success',
  props<{ values: ISubCategoryValue[] }>(),
);
export const loadSkillsWithTitlesFail = createAction('[Users] Load users skills with titles fail');

export const loadUsersList = createAction('[Users] Load users list');
export const loadUsersListSuccess = createAction('[Users] Load users list success', props<{ users: IUser[] }>());
export const loadUsersListFail = createAction('[Users] Load users list fail');

export const deleteUser = createAction('[Users] delete user', props<{ userId: string; isCurrent: boolean }>());
export const deleteUserSuccess = createAction('[Users] delete user success');
export const deleteOtherUserSuccess = createAction('[Users] delete other user success');
export const deleteUserFail = createAction('[Users] delete user fail');

export const showEditForm = createAction('[Users] Show editing profile form');

export const saveEditedData = createAction('[Users] Save edited data', props<{ userId: string; data: IUserValues }>());
export const saveEditedDataSuccess = createAction('[Users] Save edited data success');
export const saveEditedDataFail = createAction('[Users] Save edited data fail');

export const updateRole = createAction('[Users] Change user role', props<{ userId: string; role: roleEnum }>());
export const updateRoleSuccess = createAction('[Users] Change user role success');
export const updateRoleFail = createAction('[Users] Change user role fail');
