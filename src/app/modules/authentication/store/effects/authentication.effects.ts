import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { roleEnum } from '@core/enums/role.enum';
import { IBasicUser } from '@core/interfaces';
import { PopupService } from '@modules/reusable/services';
import { AuthenticationService } from '../../services';
import * as authActions from '../actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private authService: AuthenticationService,
    private actions$: Actions,
    private popupService: PopupService,
    private router: Router,
  ) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.registerUser),
      switchMap((action) =>
        this.authService.registerUser(action.email, action.password).pipe(
          map((user) =>
            authActions.provideAdditionalData({
              key: user.user.uid,
              values: { email: action.email, firstName: action.firstName, lastName: action.lastName, role: roleEnum.user },
            }),
          ),
          catchError((error) => {
            this.popupService.error(error.message);
            return of(authActions.registerUserFail());
          }),
        ),
      ),
    ),
  );

  provideAdditionalData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.provideAdditionalData),
      switchMap((action) =>
        this.authService.provideAdditionalUserData(action.values, action.key).pipe(
          map(() => {
            this.router.navigate([ROUTES_PATH.home]);
            this.popupService.success('You successfully registered');
            return authActions.registerUserSuccess();
          }),
          catchError((error) => {
            this.popupService.error(error.message);
            return of(authActions.registerUserFail());
          }),
        ),
      ),
    ),
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginUser),
      switchMap((action) =>
        this.authService.signIn(action.email, action.password).pipe(
          map((user) => {
            if (user === null) {
              throw Error('No user found');
            }
            return authActions.loadUserLogin();
          }),
          catchError((error) => {
            this.popupService.error(error.message);
            return of(authActions.loginUserFail());
          }),
        ),
      ),
    ),
  );

  loadUserLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadUserLogin),
      switchMap(() =>
        this.authService.getUserRemotely().pipe(
          map((user: IBasicUser) => {
            if (user === null) {
              throw Error('User not found');
            }
            this.router.navigate([ROUTES_PATH.userProfile]);
            return authActions.loginUserSuccess({ user });
          }),
          catchError(() => of(authActions.loginUserFail())),
        ),
      ),
    ),
  );

  loadUserRefresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadUserRefresh),
      switchMap(() =>
        this.authService.getUserRemotely().pipe(
          map((user: IBasicUser) => {
            if (user === null) {
              throw Error('No user found');
            }
            return authActions.loginUserSuccess({ user });
          }),
          catchError(() => of(authActions.loginUserFail())),
        ),
      ),
    ),
  );
}
