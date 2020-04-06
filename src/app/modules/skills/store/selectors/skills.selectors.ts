import { createSelector } from '@ngrx/store';

import { SkillsModuleState, SkillsState } from '../reducers';

export const authSelector = (state: SkillsModuleState) => state.skills;

export const selectSkillsCategories = createSelector(authSelector, (state: SkillsState) => state.skillsData);

export const selectSkillsSubCategories = createSelector(authSelector, (state: SkillsState) => state.currentSubCat);

export const selectLevels = createSelector(authSelector, (state: SkillsState) => state.currentLevels);

export const selectClickable = createSelector(authSelector, (state: SkillsState) => state.clickable);
