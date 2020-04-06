import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { ISeniorityValues } from '@core/interfaces';
import { PopupService } from '@modules/reusable';
import { SkillsService } from '../../services';
import * as skillsActions from '../../store/actions';

@Injectable()
export class SkillsEffects {
  constructor(
    private actions$: Actions,
    private skillsService: SkillsService,
    private router: Router,
    private popupService: PopupService,
  ) {}

  loadSkills$ = createEffect(() =>
    this.actions$.pipe(
      ofType(skillsActions.loadSkillsNames),
      switchMap((action) =>
        this.skillsService.getSkillsData().pipe(map((data) => skillsActions.loadSkillsNamesSuccess({ categories: data }))),
      ),
      catchError((error) => {
        this.popupService.error(error.message);
        return of(skillsActions.loadSkillsNamesFail());
      }),
    ),
  );

  loadSkillValues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(skillsActions.loadSkillValuesByName),
      switchMap((action) =>
        this.skillsService.getSkillsData().pipe(
          map((res) => {
            const subCategory = res.filter((element) => element.title === action.categoryName)[0];
            if (subCategory === undefined) {
              this.popupService.error('Wrong route path!');
              this.router.navigate([ROUTES_PATH.skills]);
              return skillsActions.loadSkillValuesByNameFail();
            }
            return skillsActions.loadSkillValuesByNameSuccess({
              subCat: subCategory,
            });
          }),
          catchError((error) => {
            this.popupService.error(error.message);
            this.router.navigate([ROUTES_PATH.skills]);
            return of(skillsActions.loadSkillValuesByNameFail());
          }),
        ),
      ),
    ),
  );

  loadSkillsBySubCat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(skillsActions.loadSkillsBySubCategory),
      switchMap((action) =>
        this.skillsService.getSkillsBySubCategory(action.catTitle, action.subCatTitle, action.userId).pipe(
          map((res: ISeniorityValues) => skillsActions.loadSkillsBySubCategorySuccess({ levels: res })),
          catchError((error) => {
            this.popupService.error(error.message);
            return of(skillsActions.loadSkillsBySubCategoryFail());
          }),
        ),
      ),
    ),
  );

  sendSkillUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(skillsActions.sendSkillUpdate),
      switchMap((action) =>
        this.skillsService.setUsersSkills(action.catTitle, action.subCatTitle, action.levels, action.userId).pipe(
          map((res) => {
            this.popupService.success('You successfully updated your skills');
            return skillsActions.sendSkillUpdateSuccess();
          }),
          catchError((error) => {
            this.popupService.error(error.message);
            return of(skillsActions.sendSkillUpdateFail());
          }),
        ),
      ),
    ),
  );
}
