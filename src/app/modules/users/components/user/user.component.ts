import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTES } from '@constants/routes.constants';
import { RoutesConst } from '@core/interfaces/routes';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  readonly userDetails: object;
  readonly routes: RoutesConst;
  constructor(private usersService: UsersService) {
    this.userDetails = this.usersService.getCurrentUser();
    this.routes = ROUTES;
  }
}
