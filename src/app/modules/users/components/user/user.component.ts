import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTES } from '../../../../../constants/routes.constants';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  userDetails: object;
  private routes: any;

  constructor(private usersService: UsersService) {
    this.userDetails = this.usersService.getCurrentUser();
    this.routes = {
      usersList: `/${ROUTES.home}/${ROUTES.users}/${ROUTES.usersList}`
    };
  }
}
