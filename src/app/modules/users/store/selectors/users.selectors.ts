import { createSelector } from '@ngrx/store';

import { UsersModuleState, UsersState } from '../reducers';

export const usersSelector = (state: UsersModuleState) => state.users;

export const selectTotalSkillsProgress = createSelector(usersSelector, (state: UsersState) => state.skillProgress);

export const selectOtherUserDetails = createSelector(usersSelector, (state: UsersState) => state.otherUserDetails);
export const selectOtherUserSkillProgress = createSelector(usersSelector, (state: UsersState) => state.otherUserSkillsProgress);
export const selectSkillsLoading = createSelector(usersSelector, (state: UsersState) => state.loadingUsersSkills);

export const selectUsersList = createSelector(usersSelector, (state: UsersState) => state.usersList);

export const selectDeletingUser = createSelector(usersSelector, (state: UsersState) => state.deletingUser);

export const selectEditingFormVisibility = createSelector(usersSelector, (state: UsersState) => state.editingFormVisibility);
export const selectEditLoading = createSelector(usersSelector, (state: UsersState) => state.editLoading);

export const selectRoleLoading = createSelector(usersSelector, (state: UsersState) => state.roleLoading);

export const selectSubCatsLoading = createSelector(usersSelector, (state: UsersState) => state.subCatsLoading);
export const selectSubCatsDesc = createSelector(usersSelector, (state: UsersState) => state.subCatsDesc);
