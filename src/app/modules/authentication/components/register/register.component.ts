import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst } from '@core/interfaces';
import { AuthState } from '@modules/authentication/store';
import { selectRegisterLoading } from '@modules/authentication/store/selectors/auth.selectors';
import { PopupService } from '@modules/reusable';
import { equalityValidator } from '@shared/equality.validator';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { AuthenticationService } from '../../services';
import * as authActions from '../../store/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  registerForm: AppFormGroup;
  routes: IRoutesConst;
  private stateSubscription;

  constructor(
    private authService: AuthenticationService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private popupService: PopupService,
    private store: Store<AuthState>,
  ) {
    this.registerForm = new AppFormGroup({
      email: new AppFormControl('', [Validators.required, Validators.email]),
      firstName: new AppFormControl('', [Validators.required]),
      lastName: new AppFormControl('', [Validators.required]),
      password: new AppFormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new AppFormControl('', [Validators.required, equalityValidator('password')]),
    });
    this.routes = ROUTES_PATH;
    this.stateSubscription = this.store.pipe(select(selectRegisterLoading)).subscribe((res) => {
      res === true ? this.registerForm.disable() : this.registerForm.enable();
    });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
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
}
