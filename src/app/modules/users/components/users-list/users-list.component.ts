import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { RoutesConst } from '@core/interfaces/routes';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  routes: RoutesConst;
  users;

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) {
    this.routes = ROUTES;
    this.usersService.getUsersList().subscribe((response) => {
      this.users = response;
      console.log(response);
      this.cdRef.markForCheck();
    });
  }

  logout = (): void => {
    this.authService.logout();
    this.router.navigate(['/']);
    this.cdRef.markForCheck();
  };
}
