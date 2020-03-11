import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ROUTES_PATH } from '@constants/routes.constants';
import { AuthenticationService } from '@modules/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (await this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.logout();
      await this.router.navigate([ROUTES_PATH.home]);
      return false;
    }
  }
}
