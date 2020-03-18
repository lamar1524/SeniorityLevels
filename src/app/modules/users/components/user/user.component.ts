import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { User } from 'firebase';
import { throwError } from 'rxjs';

import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { ICategoryProgress, ISeniority } from '@core/interfaces';
import { default as data } from '@modules/skills/components/skills/data';
import { SkillsService } from '@modules/skills/services/skills.service';
import { UsersService } from '@modules/users/services/users.service';
import { DataSharingService } from '@shared/services/data-sharing.service';

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

  constructor(
    private usersService: UsersService,
    private skillsService: SkillsService,
    private dataSharingService: DataSharingService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.userDetails = this.dataSharingService.getUser();
    this.progress = {
      junior: 0,
      middle: 0,
      senior: 0,
    };
    this.data = data;
    this.getProgressOf(this.userDetails.uid);
  }

  getProgressOf(userId: string) {
    this.skillsService.getAllSkillsValues(userId).subscribe(
      (res) => {
        this.progress = this.skillsService.getProgressOf(res, CATEGORIES_AMOUNT.total);
        this.cdRef.markForCheck();
      },
      (error) => {
        throwError(error);
      },
    );
  }
}
