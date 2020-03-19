import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { ROUTES_PATH } from '@constants/routes.constants';
import { ILinkedUser, IUser } from '@core/interfaces';
import { IRoutesConst } from '@core/interfaces';
import { DISPLAYED_COLUMNS } from '@modules/users/consts/users.consts';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly routes: IRoutesConst;
  readonly displayedColumns: string[];
  users: ILinkedUser[];

  constructor(private usersService: UsersService, private cdRef: ChangeDetectorRef) {
    this.routes = ROUTES_PATH;
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
        profileLink: `${ROUTES_PATH.otherUserProfile}/${element.key}`,
      }),
    );
  }
}
