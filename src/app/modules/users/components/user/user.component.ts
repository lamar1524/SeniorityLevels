import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { RoutesConst } from '@core/interfaces';
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

  constructor(private usersService: UsersService, private authService: AuthenticationService, private router: Router) {
    this.userDetails = this.usersService.getCurrentUser();
    this.routes = ROUTES;
  }
}
