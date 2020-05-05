import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IBasicUser, ICategoryProgress, ISeniorityCount } from '@core/interfaces';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import { DialogService } from '@modules/reusable';
import * as usersActions from '../../store/actions';
import { UsersModuleState } from '../../store/reducers';
import * as usersSelectors from '../../store/selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnDestroy {
  private user$: Subscription;
  formVisibility$: Observable<boolean>;
  userDetails: IBasicUser;
  progress$: Observable<ISeniorityCount>;
  data: ICategoryProgress[];

  constructor(
    private cdRef: ChangeDetectorRef,
    private authStore: Store<AuthModuleState>,
    private usersStore: Store<UsersModuleState>,
    private deleteDialogService: DialogService,
  ) {
    this.loadCurrentUser();
    this.progress$ = this.usersStore.select(usersSelectors.selectTotalSkillsProgress);
    this.formVisibility$ = this.usersStore.select(usersSelectors.selectEditingFormVisibility);
  }

  get userLoaded() {
    return !!this.userDetails;
  }

  loadCurrentUser() {
    this.user$ = this.authStore
      .select(selectCurrentUser)
      .pipe(filter((user) => user !== null))
      .subscribe((user: IBasicUser) => {
        this.selectCurrentUserHandler(user);
      });
  }

  selectCurrentUserHandler(user: IBasicUser) {
    this.userDetails = user;
    this.cdRef.markForCheck();
    this.usersStore.dispatch(usersActions.loadTotalProgress({ userId: user.uid }));
  }

  showDeletePopup() {
    this.deleteDialogService.showDeleteUserDialog(
      this.userDetails.uid,
      'Deleting user',
      true,
      'Are you sure that you want to delete your account?',
    );
  }

  showForm() {
    this.usersStore.dispatch(usersActions.showEditForm());
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }
}
