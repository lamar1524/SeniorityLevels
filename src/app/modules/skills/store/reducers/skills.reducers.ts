import { createReducer, on, Action } from '@ngrx/store';

import { ICategoryProgress, ISeniorityValues } from '@core/interfaces';
import * as skillsActions from '../actions';

export interface SkillsModuleState {
  skills: SkillsState;
}

export interface SkillsState {
  loadingSkillsTitles: boolean;
  skillsData: ICategoryProgress[];
  loadSkillsValues: boolean;
  loadSkillsBySubCat: boolean;
  currentSubCat: ICategoryProgress;
  clickable: boolean;
  currentLevels: ISeniorityValues;
}

export const initialState: SkillsState = {
  loadingSkillsTitles: false,
  skillsData: null,
  loadSkillsValues: false,
  currentSubCat: null,
  clickable: true,
  loadSkillsBySubCat: false,
  currentLevels: { junior: false, middle: false, senior: false },
};

export const SKILLS_REDUCER = createReducer(
  initialState,
  on(skillsActions.loadSkillsNames, (state) => ({ ...state, loadingSkillsTitles: true })),
  on(skillsActions.loadSkillsNamesSuccess, (state, { categories }) => ({ ...state, loadingSkillsTitles: false, skillsData: categories })),
  on(skillsActions.loadSkillsNamesFail, (state) => ({ ...state, loadingSkillsTitles: false })),

  on(skillsActions.loadSkillValuesByName, (state) => ({ ...state, loadSkillsValues: true })),
  on(skillsActions.loadSkillValuesByNameSuccess, (state, { subCat }) => ({ ...state, loadSkillsValues: false, currentSubCat: subCat })),
  on(skillsActions.loadSkillValuesByNameFail, (state) => ({ ...state, loadSkillsValues: false })),

  on(skillsActions.loadSkillsBySubCategory, (state) => ({ ...state, loadSkillsBySubCat: true, clickable: false })),
  on(skillsActions.loadSkillsBySubCategorySuccess, (state, { levels }) => ({
    ...state,
    loadSkillsBySubCat: false,
    currentLevels: { ...levels },
    clickable: true,
  })),
  on(skillsActions.loadSkillsBySubCategoryFail, (state) => ({
    ...state,
    loadSkillsBySubCat: false,
    currentLevels: { ...initialState.currentLevels },
    clickable: true,
  })),

  on(skillsActions.sendSkillUpdate, (state) => ({ ...state, clickable: false })),
  on(skillsActions.sendSkillUpdateSuccess, (state) => ({ ...state, clickable: true })),
  on(skillsActions.sendSkillUpdateFail, (state) => ({ ...state, clickable: true })),
);

export function skillsReducer(state: SkillsState, action: Action) {
  return SKILLS_REDUCER(state, action);
}
