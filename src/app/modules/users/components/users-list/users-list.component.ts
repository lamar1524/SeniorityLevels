import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { ILinkedUser, IUser } from '@core/interfaces';
import { RoutesConst } from '@core/interfaces';
import { DISPLAYED_COLUMNS } from '@modules/users/consts/users.consts';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly routes: RoutesConst;
  readonly displayedColumns: string[];
  users: ILinkedUser[];

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) {
    this.routes = ROUTES;
    this.usersService.getUsersList().subscribe((response) => {
      this.users = UsersListComponent.usersToLinkedUsers(response);
      this.cdRef.markForCheck();
    });
    this.displayedColumns = DISPLAYED_COLUMNS;
  }

  static usersToLinkedUsers(tab: IUser[]): ILinkedUser[] {
    return tab.map(
      (element: IUser): ILinkedUser => ({
        ...element,
        profileLink: `/${ROUTES.home}/${ROUTES.users}/${ROUTES.otherUserProfile}/${element.key}`,
      }),
    );
  }

  logout = (): void => {
    this.authService.logout();
    this.router.navigate([ROUTES.home]);
  };
}
