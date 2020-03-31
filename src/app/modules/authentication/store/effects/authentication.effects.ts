import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { AuthenticationService } from '@modules/authentication';
import { PopupService } from '@modules/reusable';
import * as authActions from '../actions';

@Injectable()
export class AuthenticationEffects {
  constructor(private authService: AuthenticationService, private actions$: Actions, private popupService: PopupService) {}
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.registerUser),
      exhaustMap((action) =>
        this.authService.registerUser(action.email, action.password).pipe(
          catchError((error) => of(authActions.registerUserFail())),
          map((user) =>
            authActions.provideAdditionalData({
              key: user.user.uid,
              values: { email: action.email, firstName: action.firstName, lastName: action.lastName },
            }),
          ),
        ),
      ),
    ),
  );

  provideAdditionalData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.provideAdditionalData),
      exhaustMap((action) =>
        this.authService.provideAdditionalUserData(action.values, action.key).pipe(
          map((user) => {
            this.popupService.success('You successfully registered');
            return authActions.registerUserSuccess();
          }),
          catchError((error) => of(authActions.registerUserFail())),
        ),
      ),
    ),
  );
}
