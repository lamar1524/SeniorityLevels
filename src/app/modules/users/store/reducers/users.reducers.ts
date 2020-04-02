import { createReducer, on, Action } from '@ngrx/store';

import { ISeniorityCount, ISubCategoryValue, IUserValues } from '@core/interfaces';
import * as usersActions from '../actions';

export interface UsersModuleState {
  users: UsersState;
}

export interface UsersState {
  computing: boolean;
  skillProgress: ISeniorityCount;
  otherUserDetails: IUserValues;
  otherUserSkillsProgress: ISubCategoryValue[];
}

export const initialState: UsersState = {
  computing: false,
  skillProgress: {
    junior: 0,
    middle: 0,
    senior: 0,
  },
  otherUserSkillsProgress: null,
  otherUserDetails: null,
};

const USERS_REDUCER = createReducer(
  initialState,
  on(usersActions.loadTotalProgress, (state) => ({ ...state, computing: true })),
  on(usersActions.computeTotalProgressSuccess, (state, { values }) => ({ ...state, computing: false, skillProgress: values })),
  on(usersActions.computeTotalProgressFail, (state) => ({ ...state, skillProgress: initialState.skillProgress })),
  on(usersActions.loadOtherUserDetails, (state) => ({ ...state, computing: true })),
  on(usersActions.loadOtherUserDetailsFail, (state) => ({ ...state, computing: false })),
  on(usersActions.loadOtherUserSuccess, (state, { user }) => ({ ...state, otherUserDetails: user })),
  on(usersActions.loadSkillsWithTitles, (state) => state),
  on(usersActions.loadSkillsWithTitlesFail, (state) => ({ ...state, computing: false })),
  on(usersActions.loadSkillsWithTitlesSuccess, (state, { values }) => ({ ...state, computing: false, otherUserSkillsProgress: values })),
);

export function usersReducer(state: UsersState, action: Action) {
  return USERS_REDUCER(state, action);
}
