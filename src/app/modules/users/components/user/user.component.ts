import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ICategoryProgress, ISeniorityCount } from '@core/interfaces';
import { AuthModuleState } from '@modules/authentication/store';
import { selectCurrentUser } from '@modules/authentication/store/selectors';
import { PopupService } from '@modules/reusable';
import { SkillsService } from '@modules/skills';
import { UsersModuleState } from '@modules/users/store/reducers';
import { selectTotalSkillsProgress } from '@modules/users/store/selectors';
import { UsersService } from '../../services';
import * as usersActions from '../../store/actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnDestroy {
  private userDetails: User;
  private userSub$: Subscription;
  private progress$: Observable<ISeniorityCount>;
  data: ICategoryProgress[];

  constructor(
    private usersService: UsersService,
    private skillsService: SkillsService,
    private popupService: PopupService,
    private cdRef: ChangeDetectorRef,
    private authStore: Store<AuthModuleState>,
    private usersStore: Store<UsersModuleState>,
  ) {
    this.userSub$ = this.authStore
      .pipe(select(selectCurrentUser))
      .pipe(filter((user) => user !== null))
      .subscribe((user) => {
        this.userDetails = user;
        this.usersStore.dispatch(usersActions.loadTotalProgress({ userId: this.userDetails.uid }));
      });
    this.progress$ = this.usersStore.pipe(select(selectTotalSkillsProgress));
  }

  get userLoaded() {
    return !!this.userDetails;
  }

  ngOnDestroy(): void {
    this.userSub$.unsubscribe();
  }
}
