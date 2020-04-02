import { createSelector } from '@ngrx/store';

import { UsersModuleState, UsersState } from '../reducers';

export const usersSelector = (state: UsersModuleState) => state.users;

export const selectTotalSkillsProgress = createSelector(usersSelector, (state: UsersState) => state.skillProgress);

export const selectOtherUserDetails = createSelector(usersSelector, (state: UsersState) => state.otherUserDetails);
export const selectOtherUserSkillProgress = createSelector(usersSelector, (state: UsersState) => state.otherUserSkillsProgress);
export const selectSkillsComputing = createSelector(usersSelector, (state: UsersState) => state.computing);
