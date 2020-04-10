import { IUserValues } from '@core/interfaces';
import * as usersActions from '../actions';
import { initialState, usersReducer, UsersState } from '../reducers';

describe('usersReducer reducer', () => {
  describe('loadTotalProgress', () => {
    it('should change loadingUsersSkills in state when loading initialized', () => {
      const expected = { ...initialState, loadingUsersSkills: true };
      expect(usersReducer(undefined, usersActions.loadTotalProgress)).toEqual(expected);
    });

    it('should change loadingUsersSkills in state when loading success', () => {
      const expected = { ...initialState, loadingUsersSkills: false, skillProgress: {} as any };
      expect(usersReducer(undefined, usersActions.computeTotalProgressSuccess({ values: {} as any }))).toEqual(expected);
    });

    it('should change loadingUsersSkills in state when loading failed', () => {
      const expected = { ...initialState, loadingUsersSkills: false };
      expect(usersReducer(undefined, usersActions.computeTotalProgressFail)).toEqual(expected);
    });
  });
  describe('loadOtherUserDetails', () => {
    it('should change loadingUsersDetails in state when loading initialized', () => {
      const expected = { ...initialState, loadingUsersDetails: true };
      expect(usersReducer(undefined, usersActions.loadOtherUserDetails)).toEqual(expected);
    });

    it('should change loadingUsersDetails in state when loading success', () => {
      const expected = { ...initialState, loadingUsersDetails: false, otherUserDetails: {} as IUserValues };
      expect(usersReducer(undefined, usersActions.loadOtherUserSuccess({ user: {} as IUserValues }))).toEqual(expected);
    });

    it('should change loadingUsersDetails in state when loading fail', () => {
      const expected = { ...initialState, loadingUsersDetails: false };
      expect(usersReducer(undefined, usersActions.loadOtherUserDetailsFail)).toEqual(expected);
    });
  });

  describe('loadUsersList action', () => {
    it('should change loadingUsersList when loading initialized', () => {
      const expected = { ...initialState, loadingUsersList: true };
      expect(usersReducer(undefined, usersActions.loadUsersList)).toEqual(expected);
    });

    it('should change loadingUsersList when loading success', () => {
      const expected = { ...initialState, loadingUsersList: false, usersList: {} as any };
      expect(usersReducer(undefined, usersActions.loadUsersListSuccess({ users: {} as any }))).toEqual(expected);
    });

    it('should change loadingUsersList when loading fail', () => {
      const expected = { ...initialState, loadingUsersList: false };
      expect(usersReducer(undefined, usersActions.loadUsersListFail)).toEqual(expected);
    });
  });
});
