import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { User } from 'firebase';
import { filter } from 'rxjs/operators';

import { ICategoryProgress, ISeniorityCount } from '@core/interfaces';
import { PopupService } from '@modules/reusable/services/popup.service';
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
  private progress: ISeniorityCount;
  data: ICategoryProgress[];

  constructor(
    private usersService: UsersService,
    private skillsService: SkillsService,
    private dataSharingService: DataSharingService,
    private popupService: PopupService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.dataSharingService
      .getUser()
      .pipe(filter((user) => user !== null))
      .subscribe(
        (user) => {
          this.userDetails = user;
          this.getProgressOf(this.userDetails.uid);
        },
        (error) => {
          this.popupService.showPopup(error.message);
        },
      );
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
        this.popupService.showPopup(error.message);
      },
    );
  }
}
