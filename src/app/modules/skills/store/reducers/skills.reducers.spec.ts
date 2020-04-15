import { ICategoryProgress, ISeniorityValues } from '@core/interfaces';
import * as skillsActions from '../actions';
import { initialState, skillsReducer, SkillsState } from '../reducers';

describe('skillsReducer reducer', () => {
  const initialStateMock: SkillsState = {
    loadingSkillsTitles: false,
    skillsData: null,
    loadSkillsValues: false,
    currentSubCat: null,
    clickable: true,
    loadSkillsBySubCat: false,
    currentLevels: { junior: false, middle: false, senior: false },
  };

  it('should assign initialState properly', () => {
    expect(skillsReducer(initialState, { type: '' })).toEqual(initialStateMock);
  });

  describe('loadSkillsNames', () => {
    it('should change loadingSkillsTitles in state when loading initialized', () => {
      const expected = { ...initialState, loadingSkillsTitles: true };
      expect(skillsReducer(undefined, skillsActions.loadSkillsNames)).toEqual(expected);
    });

    it('should change loadingSkillsTitles in state when loading success', () => {
      const expected = { ...initialState, loadingSkillsTitles: false, skillsData: {} as any };
      expect(skillsReducer(undefined, skillsActions.loadSkillsNamesSuccess({ categories: {} as any }))).toEqual(expected);
    });

    it('should change loadingSkillsTitles in state when loading failed', () => {
      const expected = { ...initialState, loadingSkillsTitles: false };
      expect(skillsReducer(undefined, skillsActions.loadSkillsNamesFail)).toEqual(expected);
    });
  });

  describe('loadSkillValuesByName', () => {
    it('should change loadSkillsValues in state when loading initialized', () => {
      const expected = { ...initialState, loadSkillsValues: true };
      expect(skillsReducer(undefined, skillsActions.loadSkillValuesByName)).toEqual(expected);
    });

    it('should change loadSkillsValues in state when loading success', () => {
      const expected = { ...initialState, loadSkillsValues: false, currentSubCat: {} as ICategoryProgress };
      expect(skillsReducer(undefined, skillsActions.loadSkillValuesByNameSuccess({ subCat: {} as ICategoryProgress }))).toEqual(expected);
    });

    it('should change loadSkillsValues in state when loading fail', () => {
      const expected = { ...initialState, loadSkillsValues: false };
      expect(skillsReducer(undefined, skillsActions.loadSkillValuesByNameFail)).toEqual(expected);
    });
  });

  describe('loadSkillsBySubCategory', () => {
    it('should change loadSkillsBySubCat in state when loading initialized', () => {
      const expected = { ...initialState, loadSkillsBySubCat: true, clickable: false };
      expect(skillsReducer(undefined, skillsActions.loadSkillsBySubCategory)).toEqual(expected);
    });

    it('should change loadSkillsBySubCat in state when loading success', () => {
      const expected = { ...initialState, loadSkillsBySubCat: false, clickable: true, currentLevels: {} as ISeniorityValues };
      expect(skillsReducer(undefined, skillsActions.loadSkillsBySubCategorySuccess({ levels: {} as ISeniorityValues }))).toEqual(expected);
    });

    it('should change loadSkillsBySubCat in state when loading fail', () => {
      const expected = { ...initialState, loadSkillsBySubCat: false, clickable: true };
      expect(skillsReducer(undefined, skillsActions.loadSkillsBySubCategoryFail)).toEqual(expected);
    });
  });

  describe('sendSkillUpdate', () => {
    it('should change clickable in state when loading initialized', () => {
      const expected = { ...initialState, clickable: false };
      expect(skillsReducer(undefined, skillsActions.sendSkillUpdate)).toEqual(expected);
    });

    it('should change clickable in state when loading success', () => {
      const expected = { ...initialState, clickable: true };
      expect(skillsReducer(undefined, skillsActions.sendSkillUpdateSuccess)).toEqual(expected);
    });

    it('should change clickable in state when loading fail', () => {
      const expected = { ...initialState, clickable: true };
      expect(skillsReducer(undefined, skillsActions.sendSkillUpdateFail)).toEqual(expected);
    });
  });
});
