import { createAction, props } from '@ngrx/store';

import { ISeniorityCount } from '@core/interfaces';

export const loadTotalProgress = createAction('[Users] Load skills', props<{ userId: string }>());
export const computeTotalProgressSuccess = createAction('[Users] Loading progress success', props<{ values: ISeniorityCount }>());
export const computeTotalProgressFail = createAction('[Users] Loading progress failed');
