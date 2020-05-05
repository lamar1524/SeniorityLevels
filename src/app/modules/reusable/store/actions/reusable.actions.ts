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
export const loadCommentsSuccess = createAction('[Reusable] Load comments success', props<{ comments: [string, IComment][] }>());
export const loadCommentsFail = createAction('[Reusable] Load comments fail');

export const editComment = createAction(
  '[Reusable] Edit comments',
  props<{ commentId: string; content: string; userId: string; catTitle: string; subCatTitle: string; level: string }>(),
);
export const editCommentSuccess = createAction(
  '[Reusable] Edit comments success',
  props<{ userId: string; catTitle: string; subCatTitle: string; level: string }>(),
);
export const editCommentFail = createAction('[Reusable] Edit comments fail');

export const deleteComment = createAction(
  '[Reusable] Delete comment',
  props<{ commentId: string; userId: string; catTitle: string; subCatTitle: string; level: string }>(),
);
export const deleteCommentSuccess = createAction(
  '[Reusable] Delete comment success',
  props<{ userId: string; catTitle: string; subCatTitle: string; level: string }>(),
);
export const deleteCommentFail = createAction('[Reusable] Delete comment fail');
