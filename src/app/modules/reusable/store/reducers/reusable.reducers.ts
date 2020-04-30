import { createReducer, on, Action } from '@ngrx/store';

import * as reusableActions from '../actions';

export interface ReusableModuleState {
  reusable: ReusableState;
}

export interface ReusableState {
  commentFormVisibility: boolean;
}

export const initialState: ReusableState = {
  commentFormVisibility: false,
};

export const REUSABLE_REDUCER = createReducer(
  initialState,
  on(reusableActions.toggleCommentForm, (state) => ({ ...state, commentFormVisibility: !state.commentFormVisibility })),
);

export function reusableReducer(state: ReusableState, action: Action) {
  return REUSABLE_REDUCER(state, action);
}
