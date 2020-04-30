import { roleEnum } from '@core/enums/role.enum';
import { IUserValues } from '@core/interfaces';
import * as usersActions from '../actions';
import { initialState, usersReducer } from '../reducers';

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

  describe('deleteUser action', () => {
    it('should change loadingUsersList when deleting initialized', () => {
      const expected = { ...initialState, deletingUser: true };
      expect(usersReducer(undefined, usersActions.deleteUser({ userId: '', isCurrent: true }))).toEqual(expected);
    });

    it('should change loadingUsersList when deleting success', () => {
      const expected = { ...initialState, deletingUser: false };
      expect(usersReducer(undefined, usersActions.deleteUserSuccess)).toEqual(expected);
    });

    it('should change loadingUsersList when deleting other user success', () => {
      const expected = { ...initialState, deletingUser: false };
      expect(usersReducer(undefined, usersActions.deleteOtherUserSuccess)).toEqual(expected);
    });

    it('should change loadingUsersList when deleting failed', () => {
      const expected = { ...initialState, deletingUser: false };
      expect(usersReducer(undefined, usersActions.deleteUserFail)).toEqual(expected);
    });
  });

  describe('saveEditedData action', () => {
    it('should change editLoading when editing initialized', () => {
      const expected = { ...initialState, editLoading: true };
      expect(usersReducer(undefined, usersActions.saveEditedData({ userId: '', data: {} as IUserValues }))).toEqual(expected);
    });

    it('should change editLoading when editing success', () => {
      const expected = { ...initialState, editLoading: false };
      expect(usersReducer(undefined, usersActions.saveEditedDataSuccess)).toEqual(expected);
    });

    it('should change editLoading when editing fail', () => {
      const expected = { ...initialState, editLoading: false };
      expect(usersReducer(undefined, usersActions.saveEditedDataFail)).toEqual(expected);
    });
  });

  describe('showEditForm action', () => {
    it('should change editingFormVisibility when called', () => {
      const expected = { ...initialState, editingFormVisibility: true };
      expect(usersReducer(undefined, usersActions.showEditForm)).toEqual(expected);
    });
  });

  describe('updateRole action', () => {
    it('should change roleLoading when editing initialized', () => {
      const expected = { ...initialState, roleLoading: true };
      expect(usersReducer(undefined, usersActions.updateRole({ userId: '', role: roleEnum.admin }))).toEqual(expected);
    });

    it('should change roleLoading when editing success', () => {
      const expected = { ...initialState, roleLoading: false };
      expect(usersReducer(undefined, usersActions.updateRoleSuccess)).toEqual(expected);
    });

    it('should change roleLoading when editing fail', () => {
      const expected = { ...initialState, roleLoading: false };
      expect(usersReducer(undefined, usersActions.updateRoleFail)).toEqual(expected);
    });
  });
});
