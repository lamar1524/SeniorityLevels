import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

import { ROUTES } from '../../../../../constants/routes.constants';
import { RoutesConst } from '../../../interfaces/routes';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm: FormGroup;
  readonly routes: RoutesConst;
  errorMessage: string;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private authService: AuthenticationService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.errorMessage = '';
    this.routes = ROUTES;
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getValidity(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }

  sendCredentials = (): void => {
    this.authService.signIn(this.email.value, this.password.value).subscribe(
      () => {
        this.authService.getTokenRemotely().subscribe(
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
