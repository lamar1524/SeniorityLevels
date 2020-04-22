import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IBasicUser } from '@core/interfaces';
import { UsersModuleState } from '@modules/users/store';
import * as usersActions from '@modules/users/store/actions';
import * as usersSelectors from '@modules/users/store/selectors';
import { AppFormControl, AppFormGroup } from '@shared/forms';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditFormComponent implements OnInit, OnDestroy {
  @Input() userDetails: IBasicUser;
  editForm: AppFormGroup;
  formLoading$: Subscription;

  constructor(private store: Store<UsersModuleState>) {
    this.editForm = new AppFormGroup({
      firstName: new AppFormControl('', Validators.required),
      lastName: new AppFormControl('', Validators.required),
    });
    this.formLoading$ = this.store.select(usersSelectors.selectEditLoading).subscribe((formState) => {
      this.formLoadingHandler(formState);
    });
  }

  ngOnInit(): void {}

  formLoadingHandler(state: boolean) {
    if (state) {
      this.editForm.disable();
    } else {
      this.editForm.enable();
    }
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
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
    this.store.dispatch(usersActions.saveEditedData(this.newCredentials));
  }

  ngOnDestroy(): void {
    this.formLoading$.unsubscribe();
  }
}
