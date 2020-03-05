import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES } from '../../../../../constants/routes.constants';
import { equalityValidator } from '../../../../shared';
import { RoutesConst } from '../../../interfaces/routes';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string;
  routes: RoutesConst;

  constructor(private authService: AuthenticationService, private chRef: ChangeDetectorRef, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', [Validators.required, equalityValidator('password')]),
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

  getValidity(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }

  sendCredentials = (): void => {
    this.authService.registerUser(this.email.value, this.password.value).subscribe(
      () => this.router.navigate([this.routes.home]),
      (error) => {
        this.message = error.message;
        this.chRef.markForCheck();
      },
    );
  };
}
