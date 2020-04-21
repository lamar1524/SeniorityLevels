import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IBasicUser, ICategoryProgress, ISeniorityCount } from '@core/interfaces';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import { DialogService } from '@modules/reusable';
import { AppFormControl, AppFormGroup } from '@shared/forms';
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
  private subscription$: Subscription;
  formVisibility$: Observable<boolean>;
  userDetails: IBasicUser;
  progress$: Observable<ISeniorityCount>;
  data: ICategoryProgress[];
  editForm: AppFormGroup;

  constructor(
    private cdRef: ChangeDetectorRef,
    private authStore: Store<AuthModuleState>,
    private usersStore: Store<UsersModuleState>,
    private deleteDialogService: DialogService,
  ) {
    this.subscription$ = new Subscription();
    this.editForm = new AppFormGroup({
      firstName: new AppFormControl('', Validators.required),
      lastName: new AppFormControl('', Validators.required),
    });
    const user$ = this.authStore
      .select(selectCurrentUser)
      .pipe(filter((user) => user !== null))
      .subscribe((user) => {
        this.userDetails = user;
        this.cdRef.markForCheck();
        this.usersStore.dispatch(usersActions.loadTotalProgress({ userId: user.uid }));
      });
    this.progress$ = this.usersStore.select(usersSelectors.selectTotalSkillsProgress);
    this.formVisibility$ = this.usersStore.select(usersSelectors.selectEditingFormVisibility);
    const formLoading$ = this.usersStore.select(usersSelectors.selectEditLoading).subscribe((formState) => {
      if (formState) {
        this.editForm.disable();
      } else {
        this.editForm.enable();
      }
    });
    this.subscription$.add(user$);
    this.subscription$.add(formLoading$);
  }

  get userLoaded() {
    return !!this.userDetails;
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  showDeletePopup() {
    this.deleteDialogService.showDeleteDialog(
      this.userDetails.uid,
      'Deleting user',
      true,
      'Are you sure that you want to delete your' + ' account?',
    );
  }

  get newCredentials() {
    return {
      userId: this.userDetails.uid,
      data: {
        email: this.userDetails.email,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        role: this.userDetails.role,
      },
    };
  }

  editCredentials() {
    this.usersStore.dispatch(usersActions.saveEditedData(this.newCredentials));
  }

  showForm() {
    this.usersStore.dispatch(usersActions.showEditForm());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
