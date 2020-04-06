import { createAction, props } from '@ngrx/store';

import { ICategoryProgress, ISeniorityValues } from '@core/interfaces';

export const loadSkillsNames = createAction('[Skills] Load skills names');
export const loadSkillsNamesSuccess = createAction('[Skills] Load skills names success', props<{ categories: ICategoryProgress[] }>());
export const loadSkillsNamesFail = createAction('[Skills] Load skills names fail');

export const loadSkillValuesByName = createAction('[Skills] Load skill values by name', props<{ categoryName: string }>());
export const loadSkillValuesByNameSuccess = createAction(
  '[Skills] Load skill values by name success',
  props<{ subCat: ICategoryProgress }>(),
);
export const loadSkillValuesByNameFail = createAction('[Skills] Load skill values by name fail');

export const loadSkillsBySubCategory = createAction(
  '[Skills] Load sub category values',
  props<{ catTitle: string; subCatTitle: string; userId: string }>(),
);
export const loadSkillsBySubCategorySuccess = createAction(
  '[Skills] Load sub category values success',
  props<{ levels: ISeniorityValues }>(),
);
export const loadSkillsBySubCategoryFail = createAction('[Skills] Load sub category values fail');

export const sendSkillUpdate = createAction(
  '[Skills] Update skill',
  props<{ catTitle: string; subCatTitle: string; levels: ISeniorityValues; userId: string }>(),
);
export const sendSkillUpdateSuccess = createAction('[Skills] Update skill success');
export const sendSkillUpdateFail = createAction('[Skills] Update skill fail');
