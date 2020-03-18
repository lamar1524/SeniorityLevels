import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { default as data } from '@modules/skills/components/skills/data';
import { DataSharingService } from '@shared/services/data-sharing.service';
import { User } from 'firebase';

import { ICategoryProgress, ISeniority } from '@core/interfaces';
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
  data: ICategoryProgress[];
  chosenCategory: ICategoryProgress;

  constructor(private usersService: UsersService, private dataSharingService: DataSharingService, private cdRef: ChangeDetectorRef) {
    this.userDetails = this.dataSharingService.getUser();
    this.cdRef.markForCheck();
    this.progress = {
      junior: '82%',
      middle: '15%',
      senior: '3%',
    };
    this.data = data;
  }
}
