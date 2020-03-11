import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  readonly userDetails: object;

  constructor(private usersService: UsersService, private authService: AuthenticationService, private router: Router) {
    this.userDetails = this.usersService.getCurrentUser();
  }
}
