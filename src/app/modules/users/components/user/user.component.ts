import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  userDetails: object;

  constructor(private usersService: UsersService) {
    this.userDetails = this.usersService.getCurrentUser();
  }
}
