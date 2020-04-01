import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { AuthenticationService } from '@modules/authentication';
import { AuthModuleState } from '@modules/authentication/store';
import * as authActions from '@modules/authentication/store/actions';
import { selectCurrentUser } from '@modules/authentication/store/selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private store: Store<AuthModuleState>) {}

  canActivate(): Observable<boolean> {
    this.store
      .pipe(select(selectCurrentUser))
      .pipe(
        first(),
        tap((user) => {
          if (user === null) {
            this.store.dispatch(authActions.loadUserRefresh());
          }
        }),
      )
      .subscribe();
    return this.authService.isLoggedIn();
  }
}
