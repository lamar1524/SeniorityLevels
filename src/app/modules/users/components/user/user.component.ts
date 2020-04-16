import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IBasicUser, ICategoryProgress, ISeniorityCount } from '@core/interfaces';
import { AuthModuleState } from '@modules/authentication/store';
import { selectCurrentUser } from '@modules/authentication/store';
import * as usersActions from '../../store/actions';
import { UsersModuleState } from '../../store/reducers';
import { selectTotalSkillsProgress } from '../../store/selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnDestroy {
  private user$: Subscription;
  userDetails: IBasicUser;
  progress$: Observable<ISeniorityCount>;
  data: ICategoryProgress[];

  constructor(private cdRef: ChangeDetectorRef, private authStore: Store<AuthModuleState>, private usersStore: Store<UsersModuleState>) {
    this.user$ = this.authStore
      .select(selectCurrentUser)
      .pipe(filter((user) => user !== null))
      .subscribe((user) => {
        this.userDetails = user;
        this.cdRef.markForCheck();
        this.usersStore.dispatch(usersActions.loadTotalProgress({ userId: user.uid }));
      });
    this.progress$ = this.usersStore.select(selectTotalSkillsProgress);
  }

  get userLoaded() {
    return !!this.userDetails;
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }
}
