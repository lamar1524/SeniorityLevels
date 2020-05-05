import { createReducer, on, Action } from '@ngrx/store';

import { IComment } from '@core/interfaces';
import * as reusableActions from '../actions';

export interface ReusableModuleState {
  reusable: ReusableState;
}

export interface ReusableState {
  commentFormVisibility: boolean;
  commentAddLoading: boolean;
  commentsLoading: boolean;
  comments: IComment[];
}

export const initialState: ReusableState = {
  commentFormVisibility: false,
  commentAddLoading: false,
  commentsLoading: false,
  comments: [],
};

export const REUSABLE_REDUCER = createReducer(
  initialState,
  on(reusableActions.toggleCommentForm, (state) => ({ ...state, commentFormVisibility: !state.commentFormVisibility })),

  on(reusableActions.addComment, (state) => ({ ...state, commentAddLoading: true })),
  on(reusableActions.addCommentSuccess, (state) => ({ ...state, commentAddLoading: false, commentFormVisibility: false })),
  on(reusableActions.addCommentFail, (state) => ({ ...state, commentAddLoading: false })),

  on(reusableActions.loadComments, (state) => ({ ...state, commentsLoading: true })),
  on(reusableActions.loadCommentsSuccess, (state, { comments }) => ({ ...state, commentsLoading: false, comments })),
  on(reusableActions.loadCommentsFail, (state) => ({ ...state, commentsLoading: false })),
);

export function reusableReducer(state: ReusableState, action: Action) {
  return REUSABLE_REDUCER(state, action);
}
