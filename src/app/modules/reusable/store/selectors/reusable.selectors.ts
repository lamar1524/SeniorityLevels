import { createSelector } from '@ngrx/store';

import { ReusableModuleState, ReusableState } from '../../store/reducers';

export const reusableSelector = (state: ReusableModuleState) => state.reusable;

export const selectFormVisibility = createSelector(reusableSelector, (state: ReusableState) => state.commentFormVisibility);

export const selectCommentFormLoading = createSelector(reusableSelector, (state: ReusableState) => state.commentAddLoading);

export const selectCommentsLoading = createSelector(reusableSelector, (state: ReusableState) => state.commentsLoading);
export const selectComments = createSelector(reusableSelector, (state: ReusableState) => state.comments);

export const selectCommentEditing = createSelector(reusableSelector, (state: ReusableState) => state.commentEditingLoading);

export const selectCommentDeleting = createSelector(reusableSelector, (state: ReusableState) => state.deletingComment);
