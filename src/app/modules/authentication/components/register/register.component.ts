import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { RoutesConst } from '@core/interfaces';
import { AuthenticationService } from '@modules/authentication';
import { equalityValidator } from '@shared/equality.validator';
import { AppFormControl, AppFormGroup } from '@shared/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: AppFormGroup;
  message: string;
  routes: RoutesConst;

  constructor(private authService: AuthenticationService, private chRef: ChangeDetectorRef, private router: Router) {
    this.registerForm = new AppFormGroup({
      email: new AppFormControl('', [Validators.required, Validators.email]),
      firstName: new AppFormControl('', [Validators.required]),
      lastName: new AppFormControl('', [Validators.required]),
      password: new AppFormControl('', Validators.required),
      repeatPassword: new AppFormControl('', [Validators.required, equalityValidator('password')]),
    });
    this.message = '';
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
    this.authService.registerUser(this.email.value, this.password.value).subscribe(
      () =>
        this.authService.provideAdditionalUserData(this.formData).subscribe(
          () => this.router.navigate([this.routes.users]),
          (error) => {
            throwError(error);
          },
        ),
      (error) => {
        this.message = error.message;
        this.chRef.markForCheck();
      },
    );
  };
}
