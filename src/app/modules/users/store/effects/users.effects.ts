import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { ISeniorityValues } from '@core/interfaces';
import { SkillsService } from '@modules/skills';
import * as usersActions from '../actions';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private skillsService: SkillsService) {}

  loadTotalProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadTotalProgress),
      switchMap((action) =>
        this.skillsService.getAllSkillsValues(action.userId).pipe(
          map((res: ISeniorityValues[]) => {
            return usersActions.computeTotalProgressSuccess({ values: this.skillsService.getProgressOf(res, CATEGORIES_AMOUNT.total) });
          }),
          catchError(() => of(usersActions.computeTotalProgressFail())),
        ),
      ),
    ),
  );
}
