import { ISubCategoryValue, IUser, IUserValues } from '@core/interfaces';
import { UsersModuleState } from '../reducers';
import * as selectors from './users.selectors';

describe('Users selectors', () => {
  const loadedState = {
    users: {
      skillProgress: {
        junior: 0,
        middle: 0,
        senior: 0,
      },
      otherUserSkillsProgress: [] as ISubCategoryValue[],
      otherUserDetails: {} as IUserValues,
      usersList: [] as IUser[],
      loadingUsersSkills: true,
    },
  } as UsersModuleState;

  it('selecting TotalSkillsProgress', () => {
    expect(selectors.selectTotalSkillsProgress(loadedState)).toEqual({
      junior: 0,
      middle: 0,
      senior: 0,
    });
  });

  it('selecting OtherUserDetails', () => {
    expect(selectors.selectOtherUserDetails(loadedState)).toEqual({} as IUserValues);
  });

  it('selecting OtherUserSkillProgress', () => {
    expect(selectors.selectOtherUserSkillProgress(loadedState)).toEqual([] as ISubCategoryValue[]);
  });

  it('selecting SkillsLoading', () => {
    expect(selectors.selectSkillsLoading(loadedState)).toEqual(true);
  });

  it('selecting UsersList', () => {
    expect(selectors.selectUsersList(loadedState)).toEqual([] as IUser[]);
  });
});
