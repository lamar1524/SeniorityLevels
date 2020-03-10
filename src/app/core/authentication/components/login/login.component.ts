import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { RoutesConst } from '@core/interfaces';
import { AppFormControl, AppFormGroup } from '@shared/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm: AppFormGroup;
  readonly routes: RoutesConst;
  errorMessage: string;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private authService: AuthenticationService) {
    this.loginForm = new AppFormGroup({
      email: new AppFormControl('', [Validators.required, Validators.email]),
      password: new AppFormControl('', [Validators.required]),
    });
    this.errorMessage = '';
    this.routes = ROUTES_PATH;
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  sendCredentials = (): void => {
    this.authService.signIn(this.email.value, this.password.value).subscribe(
      () => {
        this.authService.getTokenRemotely().subscribe(
          (token) => {
            this.authService.putTokenInSessionStorage(token);
            this.router.navigate([this.routes.users]);
          },
          (error) => {
            throwError(error);
          },
        );
      },
      (error) => {
        this.errorMessage = error.message;
        this.cdRef.markForCheck();
      },
    );
  };
}
