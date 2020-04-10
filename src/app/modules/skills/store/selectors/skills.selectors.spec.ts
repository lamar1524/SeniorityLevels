import { ICategoryProgress, ISeniorityValues } from '@core/interfaces';
import { SkillsModuleState } from '@modules/skills/store/reducers';
import * as selectors from './skills.selectors';

describe('skills selectors', () => {
  const loadedState = {
    skills: {
      skillsData: [] as ICategoryProgress[],
      currentSubCat: {} as ICategoryProgress,
      currentLevels: {} as ISeniorityValues,
      clickable: true,
    },
  } as SkillsModuleState;
  it('selecting SkillsCategories', () => {
    expect(selectors.selectSkillsCategories(loadedState)).toEqual([] as ICategoryProgress[]);
  });

  it('selecting SkillsSubCategories', () => {
    expect(selectors.selectSkillsSubCategories(loadedState)).toEqual({} as ICategoryProgress);
  });

  it('selecting levels', () => {
    expect(selectors.selectLevels(loadedState)).toEqual({} as ISeniorityValues);
  });

  it('selecting Clickable', () => {
    expect(selectors.selectClickable(loadedState)).toEqual(true);
  });
});
