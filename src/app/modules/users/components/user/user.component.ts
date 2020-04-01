import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from 'firebase';
import { filter } from 'rxjs/operators';

import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { ICategoryProgress, ISeniorityCount } from '@core/interfaces';
import { AuthModuleState } from '@modules/authentication/store';
import { selectCurrentUser } from '@modules/authentication/store/selectors';
import { PopupService } from '@modules/reusable';
import { SkillsService } from '@modules/skills';
import { UsersService } from '../../services';

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
    private popupService: PopupService,
    private cdRef: ChangeDetectorRef,
    private store: Store<AuthModuleState>,
  ) {
    this.store
      .pipe(select(selectCurrentUser))
      .pipe(filter((user) => user !== null))
      .subscribe(
        (user) => {
          this.userDetails = user;
          this.getProgressOf(this.userDetails.uid);
        },
        (error) => {
          this.popupService.error(error.message);
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
        this.popupService.error(error.message);
      },
    );
  }
}
