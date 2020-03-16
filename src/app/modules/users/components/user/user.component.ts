import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { User } from 'firebase';

import { ISeniority } from '@core/interfaces';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private userDetails: User;
  private progress: ISeniority;

  constructor(private usersService: UsersService, private cdRef: ChangeDetectorRef) {
    this.usersService.getCurrentUser().subscribe((user) => {
      this.userDetails = user;
      this.cdRef.markForCheck();
    });
    this.progress = {
      junior: '82%',
      middle: '15%',
      senior: '3%',
    };
  }
}
