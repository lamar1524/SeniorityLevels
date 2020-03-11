import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ROUTES_PATH } from '@constants/routes.constants';
import { AuthenticationService } from '@modules/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate([ROUTES_PATH.home]);
      return false;
    }
  }
}
