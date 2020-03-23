import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@modules/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthenticationService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }
}
