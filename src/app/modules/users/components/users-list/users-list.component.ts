import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { AppUser } from '@core/interfaces';
import { RoutesConst } from '@core/interfaces';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  routes: RoutesConst;
  users: Array<AppUser>;
  displayedColumns: string[];

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) {
    this.routes = ROUTES;
    this.usersService.getUsersList().subscribe((response) => {
      this.users = this.getLinks(response);
      this.cdRef.markForCheck();
    });
    this.displayedColumns = ['email', 'firstName', 'lastName', 'seniority'];
  }
  getLinks(tab) {
    return tab.map((element) => {
      return {
        key: element.key,
        profileLink: `/${ROUTES.home}/${ROUTES.users}/${ROUTES.otherUserProfile}/${element.key}`,
        values: element.values,
      };
    });
  }
  logout = (): void => {
    this.authService.logout();
    this.router.navigate([ROUTES.home]);
  };
}
