import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ROUTES } from '../../../constants/routes.constants';
import { AuthenticationService } from '../authentication/services/authentication.service';

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
      this.router.navigate([`/${ROUTES.home}`]);
      return false;
    }
  }
}
