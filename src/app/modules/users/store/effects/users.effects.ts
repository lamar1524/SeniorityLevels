import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { ISeniorityValues, IUser } from '@core/interfaces';
import { SkillsService } from '@modules/skills';
import { UsersService } from '@modules/users';
import * as usersActions from '../actions';

@Injectable()
export class UsersEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private skillsService: SkillsService,
    private usersService: UsersService,
    private titleService: Title,
  ) {}

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

  loadOtherUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadOtherUserDetails),
      switchMap((action) =>
        this.usersService.getUserByKey(action.userId).pipe(
          map((res: IUser) => {
            this.titleService.setTitle(`${res.values.firstName} ${res.values.lastName}`);
            return usersActions.loadOtherUserSuccess({
              user: { firstName: res.values.firstName, lastName: res.values.lastName, email: res.values.email },
            });
          }),
          catchError(() => {
            this.router.navigate([ROUTES_PATH.usersList]);
            return of(usersActions.loadOtherUserDetailsFail());
          }),
        ),
      ),
    ),
  );

  loadSkillsWithTitles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadSkillsWithTitles),
      switchMap((action) =>
        this.skillsService.getAllSkillsWithTitles(action.userId).pipe(
          map((res) => {
            return usersActions.loadSkillsWithTitlesSuccess({ values: this.skillsService.getSummaryProgress(res) });
          }),
          catchError(() => of(usersActions.loadSkillsWithTitlesFail())),
        ),
      ),
    ),
  );

  loadUsersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadUsersList),
      switchMap((action) =>
        this.usersService.getUsersList().pipe(
          map((list) => usersActions.loadUsersListSuccess({ users: list })),
          catchError(() => of(usersActions.loadUsersListFail())),
        ),
      ),
    ),
  );
}
