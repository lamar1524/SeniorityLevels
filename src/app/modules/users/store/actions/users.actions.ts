import { createAction, props } from '@ngrx/store';

import { ISeniorityCount, ISubCategoryValue, IUserValues } from '@core/interfaces';

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
