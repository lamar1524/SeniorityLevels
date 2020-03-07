import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { RoutesConst } from '@core/interfaces/routes';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  routes: RoutesConst;

  constructor(private authService: AuthenticationService, private router: Router, private cdRef: ChangeDetectorRef) {
    this.routes = ROUTES;
  }

  logout = (): void => {
    this.authService.logout();
    this.router.navigate(['/']);
    this.cdRef.markForCheck();
  };
}
