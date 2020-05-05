import { createAction, props } from '@ngrx/store';

import { IComment } from '@core/interfaces';

export const toggleCommentForm = createAction('[Reusable] Toggle comment form');

export const addComment = createAction(
  '[Reusable] Add comment',
  props<{ comment: IComment; userId: string; catTitle: string; subCatTitle: string; level: string }>(),
);
export const addCommentSuccess = createAction(
  '[Reusable] Add comment success',
  props<{ userId: string; catTitle: string; subCatTitle: string; level: string }>(),
);
export const addCommentFail = createAction('[Reusable] Add comment fail');

export const loadComments = createAction(
  '[Reusable] Load comments',
  props<{ userId: string; catTitle: string; subCatTitle: string; level: string }>(),
);
export const loadCommentsSuccess = createAction('[Reusable] Load comments success', props<{ comments: IComment[] }>());
export const loadCommentsFail = createAction('[Reusable] Load comments fail');
