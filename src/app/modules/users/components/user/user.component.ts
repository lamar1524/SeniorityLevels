import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ICategoryProgress, ISeniorityCount } from '@core/interfaces';
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
  private userDetails: User;
  private user$: Subscription;
  private progress$: Observable<ISeniorityCount>;
  data: ICategoryProgress[];

  constructor(private cdRef: ChangeDetectorRef, private authStore: Store<AuthModuleState>, private usersStore: Store<UsersModuleState>) {
    this.user$ = this.authStore
      .select(selectCurrentUser)
      .pipe(filter((user) => user !== null))
      .subscribe((user) => {
        this.userDetails = user;
        this.usersStore.dispatch(usersActions.loadTotalProgress({ userId: this.userDetails.uid }));
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
