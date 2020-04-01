import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst } from '@core/interfaces';
import { PopupService } from '@modules/reusable';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { AuthenticationService } from '../../services';
import { AuthModuleState } from '../../store';
import * as authActions from '../../store/actions';
import { selectLoginLoading } from '../../store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  readonly loginForm: AppFormGroup;
  readonly routes: IRoutesConst;
  private loginForm$: Subscription;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private authService: AuthenticationService,
    private popupService: PopupService,
    private store: Store<AuthModuleState>,
  ) {
    this.loginForm = new AppFormGroup({
      email: new AppFormControl('', [Validators.required, Validators.email]),
      password: new AppFormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.routes = ROUTES_PATH;
    this.loginForm$ = this.store.select(selectLoginLoading).subscribe((res) => {
      res === true ? this.loginForm.disable() : this.loginForm.enable();
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  sendCredentials = (): void => {
    this.store.dispatch(authActions.loginUser({ email: this.email.value, password: this.password.value }));
  };

  ngOnDestroy(): void {
    this.loginForm$.unsubscribe();
  }
}
