import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst } from '@core/interfaces';
import { equalityValidator } from '@shared/equality.validator';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import * as authActions from '../../store/actions';
import { AuthModuleState } from '../../store/reducers';
import { selectRegisterLoading } from '../../store/selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  registerForm: AppFormGroup;
  routes: IRoutesConst;
  private registerForm$: Subscription;

  constructor(private store: Store<AuthModuleState>) {
    this.registerForm = new AppFormGroup({
      email: new AppFormControl('', [Validators.required, Validators.email]),
      firstName: new AppFormControl('', [Validators.required]),
      lastName: new AppFormControl('', [Validators.required]),
      password: new AppFormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new AppFormControl('', [Validators.required, equalityValidator('password')]),
    });
    this.routes = ROUTES_PATH;
    this.registerForm$ = this.store.pipe(select(selectRegisterLoading)).subscribe((res) => {
      res === true ? this.registerForm.disable() : this.registerForm.enable();
    });
  }

  get email() {
    return this.registerForm.get('email') as AppFormControl;
  }

  get firstName() {
    return this.registerForm.get('firstName') as AppFormControl;
  }

  get lastName() {
    return this.registerForm.get('lastName') as AppFormControl;
  }

  get password() {
    return this.registerForm.get('password') as AppFormControl;
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword') as AppFormControl;
  }

  get formData() {
    return {
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    };
  }

  sendCredentials = (): void => {
    this.store.dispatch(authActions.registerUser({ ...this.formData, password: this.password.value }));
  };

  ngOnDestroy(): void {
    this.registerForm$.unsubscribe();
  }
}
