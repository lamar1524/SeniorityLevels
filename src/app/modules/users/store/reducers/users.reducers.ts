import { createReducer, on, Action } from '@ngrx/store';

import { ISeniorityCount } from '@core/interfaces';
import * as usersActions from '../actions';

export interface UsersModuleState {
  users: UsersState;
}

export interface UsersState {
  computing: boolean;
  skillProgress: ISeniorityCount;
}

export const initialState: UsersState = {
  computing: false,
  skillProgress: {
    junior: 0,
    middle: 0,
    senior: 0,
  },
};

const USERS_REDUCER = createReducer(
  initialState,
  on(usersActions.loadTotalProgress, (state) => ({ ...state, computing: true })),
  on(usersActions.computeTotalProgressSuccess, (state, { values }) => ({ ...state, computing: false, skillProgress: values })),
  on(usersActions.computeTotalProgressFail, (state) => initialState),
);

export function usersReducer(state: UsersState, action: Action) {
  return USERS_REDUCER(state, action);
}
