import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { RoutesConst } from '@core/interfaces/routes';
import { equalityValidator } from '@shared/equality.validator';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { throwError } from 'rxjs';

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
      password: new AppFormControl('', Validators.required),
      repeatPassword: new AppFormControl('', [Validators.required, equalityValidator('password')]),
    });
    this.message = '';
    this.routes = ROUTES;
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }

  sendCredentials = (): void => {
    this.authService.registerUser(this.email.value, this.password.value).subscribe(
      (response) =>
        this.authService.provideAdditionalUserData(response).subscribe(
          () => this.router.navigate([ROUTES.users]),
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
