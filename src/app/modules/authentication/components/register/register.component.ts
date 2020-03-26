import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst } from '@core/interfaces';
import { PopupService } from '@modules/reusable';
import { equalityValidator } from '@shared/equality.validator';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: AppFormGroup;
  routes: IRoutesConst;

  constructor(
    private authService: AuthenticationService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private popupService: PopupService,
  ) {
    this.registerForm = new AppFormGroup({
      email: new AppFormControl('', [Validators.required, Validators.email]),
      firstName: new AppFormControl('', [Validators.required]),
      lastName: new AppFormControl('', [Validators.required]),
      password: new AppFormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new AppFormControl('', [Validators.required, equalityValidator('password')]),
    });
    this.routes = ROUTES_PATH;
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
    this.registerForm.disable();
    this.authService
      .registerUser(this.email.value, this.password.value)
      .pipe(
        finalize(() => {
          this.registerForm.enable();
        }),
      )
      .subscribe(
        (user) => {
          this.authService.provideAdditionalUserData(this.formData, user.user.uid).subscribe(
            () => {
              this.registerForm.enable();
              this.popupService.success('You successfully registered');
              this.router.navigate([this.routes.home]);
            },
            (error) => {
              this.registerForm.enable();
              this.popupService.error(error.message);
            },
          );
        },
        ({ message }) => {
          this.registerForm.enable();
          this.popupService.error(message);
        },
      );
  };
}
