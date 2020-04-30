import { createReducer, on, Action } from '@ngrx/store';

import * as reusableActions from '../actions';

export interface ReusableModuleState {
  reusable: ReusableState;
}

export interface ReusableState {
  commentFormVisibility: boolean;
  commentAddLoading: boolean;
}

export const initialState: ReusableState = {
  commentFormVisibility: false,
  commentAddLoading: false,
};

export const REUSABLE_REDUCER = createReducer(
  initialState,
  on(reusableActions.toggleCommentForm, (state) => ({ ...state, commentFormVisibility: !state.commentFormVisibility })),
  on(reusableActions.addComment, (state) => ({ ...state, commentAddLoading: true })),
  on(reusableActions.addCommentSuccess, (state) => ({ ...state, commentAddLoading: false })),
  on(reusableActions.addCommentFail, (state) => ({ ...state, commentAddLoading: false })),
);

export function reusableReducer(state: ReusableState, action: Action) {
  return REUSABLE_REDUCER(state, action);
}
