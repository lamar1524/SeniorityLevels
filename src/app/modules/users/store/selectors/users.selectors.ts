import { createSelector } from '@ngrx/store';

import { UsersModuleState, UsersState } from '../reducers';

export const usersSelector = (state: UsersModuleState) => state.users;

export const selectTotalSkillsProgress = createSelector(usersSelector, (state: UsersState) => state.skillProgress);
