import { UsersModuleState } from '../reducers';
import * as selectors from './users.selectors';

describe('Users selectors', () => {
  const loadedState = {
    users: {
      loadingUsersDetails: false,
      loadingUsersSkills: false,
      loadingSkillsWithTitles: false,
      loadingUsersList: false,
      skillProgress: {
        junior: 0,
        middle: 0,
        senior: 0,
      },
      otherUserSkillsProgress: null,
      otherUserDetails: null,
      usersList: null,
    },
  } as UsersModuleState;

  it('selecting TotalSkillsProgress', () => {
    expect(selectors.selectTotalSkillsProgress(loadedState)).toEqual(loadedState.users.skillProgress);
  });

  it('selecting OtherUserDetails', () => {
    expect(selectors.selectOtherUserDetails(loadedState)).toEqual(loadedState.users.otherUserDetails);
  });

  it('selecting OtherUserSkillProgress', () => {
    expect(selectors.selectOtherUserSkillProgress(loadedState)).toEqual(loadedState.users.otherUserSkillsProgress);
  });

  it('selecting SkillsLoading', () => {
    expect(selectors.selectSkillsLoading(loadedState)).toBeFalsy();
  });

  it('selecting UsersList', () => {
    expect(selectors.selectUsersList(loadedState)).toEqual(loadedState.users.usersList);
  });
});
