import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { UsersService } from '@modules/users/services/users.service';
import { User } from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private userDetails: User;

  constructor(private usersService: UsersService, private cdRef: ChangeDetectorRef) {
    this.usersService.getCurrentUser().subscribe(user => {
      this.userDetails = user;
      this.cdRef.markForCheck();
    });
  }
}
