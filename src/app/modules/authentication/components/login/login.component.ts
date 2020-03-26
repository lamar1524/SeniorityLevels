import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst } from '@core/interfaces';
import { PopupService } from '@modules/reusable';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm: AppFormGroup;
  readonly routes: IRoutesConst;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private authService: AuthenticationService,
    private popupService: PopupService,
  ) {
    this.loginForm = new AppFormGroup({
      email: new AppFormControl('', [Validators.required, Validators.email]),
      password: new AppFormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.routes = ROUTES_PATH;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  sendCredentials = (): void => {
    this.loginForm.disable();
    this.authService
      .signIn(this.email.value, this.password.value)
      .pipe(finalize(() => this.loginForm.enable()))
      .subscribe(
        () => this.handleCredentialsSuccess(),
        (error) => this.popupService.showPopup(error.message),
      );
  };

  handleCredentialsSuccess(): void {
    this.authService.getUserRemotely().subscribe(
      (user) => {
        this.authService.getTokenFromUser(user).subscribe(
          (token) => {
            this.authService.putTokenInSessionStorage(token);
            this.router.navigate([this.routes.users]);
          },
          (error) => {
            this.popupService.showPopup(error.message);
          },
        );
      },
      (error) => {
        this.popupService.showPopup(error.message);
      },
    );
  }
}
