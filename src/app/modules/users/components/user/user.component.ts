import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { DataSharingService } from '@shared/services/data-sharing.service';
import { User } from 'firebase';
import { throwError } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ICategoryProgress, ISeniorityCount } from '@core/interfaces';
import { SkillsService } from '@modules/skills/services/skills.service';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private userDetails: User;
  private progress: ISeniorityCount;
  data: ICategoryProgress[];

  constructor(
    private usersService: UsersService,
    private skillsService: SkillsService,
    private dataSharingService: DataSharingService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.dataSharingService
      .getUser()
      .pipe(filter((user) => user !== null))
      .subscribe((user) => {
        this.userDetails = user;
        this.getProgressOf(this.userDetails.uid);
      });
    this.progress = {
      junior: 0,
      middle: 0,
      senior: 0,
    };
  }

  get contentLoaded() {
    return !!this.userDetails;
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
