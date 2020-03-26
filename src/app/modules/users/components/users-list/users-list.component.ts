import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { ROUTES_PATH } from '@constants/routes.constants';
import { ILinkedUser, IRoutesConst, IUser } from '@core/interfaces';
import { PopupService } from '@modules/reusable';
import { DISPLAYED_COLUMNS } from '../../consts';
import { UsersService } from '../../services';

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

  constructor(private usersService: UsersService, private cdRef: ChangeDetectorRef, private popupService: PopupService) {
    this.routes = ROUTES_PATH;
    this.usersService.getUsersList().subscribe(
      (response) => {
        this.users = UsersListComponent.usersToLinkedUsers(response);
        this.cdRef.markForCheck();
      },
      (error) => {
        this.popupService.error(error.message);
      },
    );
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
