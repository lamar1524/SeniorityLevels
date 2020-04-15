import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst, IUser } from '@core/interfaces';
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

  constructor(private store: Store<UsersModuleState>) {
    this.routes = ROUTES_PATH;
    this.displayedColumns = DISPLAYED_COLUMNS;
    this.store.dispatch(usersActions.loadUsersList());
    this.users$ = this.store.select(selectUsersList);
  }
}
