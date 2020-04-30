import { createSelector } from '@ngrx/store';

import { ReusableModuleState, ReusableState } from '../../store/reducers';

export const reusableSelector = (state: ReusableModuleState) => state.reusable;

export const selectFormVisibility = createSelector(reusableSelector, (state: ReusableState) => state.commentFormVisibility);
