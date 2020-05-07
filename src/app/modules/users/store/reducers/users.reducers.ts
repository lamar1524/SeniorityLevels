import { createReducer, on, Action } from '@ngrx/store';

import { ICategoryProgress, ISeniorityCount, ISubCategoryValue, IUser, IUserValues } from '@core/interfaces';
import * as usersActions from '../actions';

export interface UsersModuleState {
  users: UsersState;
}

export interface UsersState {
  loadingUsersDetails: boolean;
  loadingUsersSkills: boolean;
  loadingSkillsWithTitles: boolean;
  loadingUsersList: boolean;
  deletingUser: boolean;
  editingFormVisibility: boolean;
  editLoading: boolean;
  roleLoading: boolean;
  subCatsLoading: boolean;
  subCatsDesc: ICategoryProgress;
  skillProgress: ISeniorityCount;
  otherUserDetails: IUserValues;
  otherUserSkillsProgress: ISubCategoryValue[];
  usersList: IUser[];
}

export const initialState: UsersState = {
  loadingUsersDetails: false,
  loadingUsersSkills: false,
  loadingSkillsWithTitles: false,
  loadingUsersList: false,
  deletingUser: false,
  editingFormVisibility: false,
  editLoading: false,
  roleLoading: false,
  subCatsLoading: false,
  subCatsDesc: null,
  skillProgress: {
    junior: 0,
    middle: 0,
    senior: 0,
  },
  otherUserSkillsProgress: null,
  otherUserDetails: null,
  usersList: null,
};

const USERS_REDUCER = createReducer(
  initialState,
  on(usersActions.loadTotalProgress, (state) => ({ ...state, loadingUsersSkills: true })),
  on(usersActions.computeTotalProgressSuccess, (state, { values }) => ({ ...state, loadingUsersSkills: false, skillProgress: values })),
  on(usersActions.computeTotalProgressFail, (state) => ({
    ...state,
    skillProgress: initialState.skillProgress,
    loadingUsersSkills: false,
  })),

  on(usersActions.loadOtherUserDetails, (state) => ({ ...state, loadingUsersDetails: true })),
  on(usersActions.loadOtherUserDetailsFail, (state) => ({ ...state, loadingUsersDetails: false })),
  on(usersActions.loadOtherUserSuccess, (state, { user }) => ({ ...state, otherUserDetails: user, loadingUsersDetails: false })),

  on(usersActions.loadSkillsWithTitles, (state) => ({ ...state, loadingSkillsWithTitles: true, otherUserSkillsProgress: null })),
  on(usersActions.loadSkillsWithTitlesFail, (state) => ({ ...state, loadingSkillsWithTitles: false })),
  on(usersActions.loadSkillsWithTitlesSuccess, (state, { values }) => ({
    ...state,
    loadingSkillsWithTitles: false,
    otherUserSkillsProgress: values,
  })),

  on(usersActions.loadUsersList, (state) => ({ ...state, loadingUsersList: true })),
  on(usersActions.loadUsersListSuccess, (state, { users }) => ({ ...state, usersList: users, loadingUsersList: false })),
  on(usersActions.loadUsersListFail, (state) => ({ ...state, usersList: null, loadingUsersList: false })),

  on(usersActions.deleteUser, (state) => ({ ...state, deletingUser: true })),
  on(usersActions.deleteUserSuccess, (state) => ({ ...state, deletingUser: false })),
  on(usersActions.deleteOtherUserSuccess, (state) => ({ ...state, deletingUser: false })),
  on(usersActions.deleteUserFail, (state) => ({ ...state, deletingUser: false })),

  on(usersActions.showEditForm, (state) => ({ ...state, editingFormVisibility: true })),

  on(usersActions.saveEditedData, (state) => ({ ...state, editLoading: true })),
  on(usersActions.saveEditedDataSuccess, (state) => ({ ...state, editLoading: false, editingFormVisibility: false })),
  on(usersActions.saveEditedDataFail, (state) => ({ ...state, editLoading: false })),

  on(usersActions.updateRole, (state) => ({ ...state, roleLoading: true })),
  on(usersActions.updateRoleSuccess, (state) => ({ ...state, roleLoading: false })),
  on(usersActions.updateRoleFail, (state) => ({ ...state, roleLoading: false })),

  on(usersActions.loadSubCategoriesDesc, (state) => ({ ...state, subCatsLoading: true, subCatsDesc: null })),
  on(usersActions.loadSubCategoriesDescSuccess, (state, { subCats }) => ({ ...state, subCatsLoading: false, subCatsDesc: subCats })),
  on(usersActions.loadSubCategoriesDescFail, (state) => ({ ...state, subCatsLoading: false, subCatsDesc: null })),
);

export function usersReducer(state: UsersState, action: Action) {
  return USERS_REDUCER(state, action);
}
