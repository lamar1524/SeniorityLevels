import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { ISeniorityValues, IUser } from '@core/interfaces';
import { AuthenticationService } from '@modules/authentication';
import { PopupService } from '@modules/reusable';
import { SkillsService } from '@modules/skills';
import { UsersService } from '../../services';
import * as usersActions from '../actions';

@Injectable()
export class UsersEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private skillsService: SkillsService,
    private usersService: UsersService,
    private titleService: Title,
    private popupService: PopupService,
    private authService: AuthenticationService,
  ) {}

  loadTotalProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadTotalProgress),
      switchMap((action) =>
        this.skillsService.getAllSkillsValues(action.userId).pipe(
          map((res: ISeniorityValues[]) => {
            return usersActions.computeTotalProgressSuccess({ values: this.skillsService.getProgressOf(res, CATEGORIES_AMOUNT.total) });
          }),
          catchError(() => {
            return of(usersActions.computeTotalProgressFail());
          }),
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
              user: { ...res.values },
            });
          }),
          catchError((error) => {
            this.popupService.error(error.message);
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

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.deleteUser),
      switchMap((action) =>
        this.usersService.deleteAccount(action.userId).pipe(
          map(() => {
            if (!action.isCurrent) {
              this.popupService.success('Successfully deleted this account');
              this.router.navigate([ROUTES_PATH.usersList]);
              return usersActions.deleteOtherUserSuccess();
            } else {
              this.popupService.success('Successfully deleted your account');
              this.router.navigate([ROUTES_PATH.home]);
              this.authService.logout();
              return usersActions.deleteUserSuccess();
            }
          }),
          catchError(() => of(usersActions.deleteUserFail())),
        ),
      ),
    ),
  );

  saveEditedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.saveEditedData),
      switchMap((action) =>
        this.usersService.editCredentials(action.userId, action.data).pipe(
          map(() => {
            this.popupService.success('Successfully updated credentials');
            return usersActions.saveEditedDataSuccess();
          }),
          catchError((error) => {
            this.popupService.error(error.message);
            return of(usersActions.saveEditedDataFail());
          }),
        ),
      ),
    ),
  );

  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.updateRole),
      switchMap((action) =>
        this.usersService.editRole(action.userId, action.role).pipe(
          map(() => {
            this.popupService.success('Successfully updated credentials');
            return usersActions.updateRoleSuccess();
          }),
          catchError((error) => {
            this.popupService.error(error.message);
            return of(usersActions.updateRoleFail());
          }),
        ),
      ),
    ),
  );
}
