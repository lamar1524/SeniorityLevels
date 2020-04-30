import { createAction, props } from '@ngrx/store';

import { IComment } from '@core/interfaces';

export const toggleCommentForm = createAction('[Reusable] Toggle comment form');

export const addComment = createAction(
  '[Reusable] Add comment',
  props<{ comment: IComment; userId: string; catTitle: string; subCatTitle: string }>(),
);
export const addCommentSuccess = createAction('[Reusable] Add comment success');
export const addCommentFail = createAction('[Reusable] Add comment fail');
