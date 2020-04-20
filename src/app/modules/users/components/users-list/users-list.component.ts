import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTES_PATH } from '@constants/routes.constants';
import { roleEnum } from '@core/enums/role.enum';
import { IRoutesConst, IUser } from '@core/interfaces';
import { badgeSizeEnum } from '@modules/reusable/enums/user-badge.enum';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DISPLAYED_COLUMNS } from '../../consts';
import * as usersActions from '../../store/actions';
import { UsersModuleState } from '../../store/reducers';
import { selectUsersList } from '../../store/selectors';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly routes: IRoutesConst;
  readonly displayedColumns: string[];
  users$: Observable<IUser[]>;
  adminRole: roleEnum;
  size: badgeSizeEnum;

  constructor(private store: Store<UsersModuleState>) {
    this.routes = ROUTES_PATH;
    this.displayedColumns = DISPLAYED_COLUMNS;
    this.store.dispatch(usersActions.loadUsersList());
    this.users$ = this.store.select(selectUsersList);
    this.adminRole = roleEnum.admin;
    this.size = badgeSizeEnum.small;
  }
}
