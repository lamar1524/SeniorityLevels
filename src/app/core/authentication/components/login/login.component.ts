import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, throwError } from 'rxjs';

import { ROUTES } from '../../../../../constants/routes.constants';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly title: string;
  readonly caption: string;
  readonly loginForm: FormGroup;
  errorMessage: string;
  routes: any;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private authService: AuthenticationService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.title = 'Login';
    this.errorMessage = '';
    this.caption = 'No account yet? Register here';
    this.routes = ROUTES;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get emailInvalid() {
    return this.email.invalid && (this.email.dirty || this.email.touched);
  }

  get passwordInvalid() {
    return this.password.invalid && (this.password.dirty || this.password.touched);
  }

  sendCredentials = (): void => {
    this.authService.signIn(this.email.value, this.password.value).subscribe(
      () => {
        from(this.authService.getTokenRemotely()).subscribe(
          (token) => {
            this.authService.putTokenInSessionStorage(token);
            this.router.navigate([`/${this.routes.users}`]);
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
