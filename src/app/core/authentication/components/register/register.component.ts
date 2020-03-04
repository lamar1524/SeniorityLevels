import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  title: string;
  caption: string;
  registerForm: FormGroup;
  message: string;
  constructor(private authService: AuthenticationService, private chRef: ChangeDetectorRef, private router: Router) {
    this.caption = 'Homepage';
    this.title = 'Join us';
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    this.registerForm.addControl('repeatPassword', new FormControl('', [Validators.required, this.validateEquality.bind(this)]));
    this.message = '';
  }
  private validateEquality(fieldControl: FormControl) {
    return fieldControl.value === this.registerForm.get('password').value
      ? null
      : {
          NotEqual: true,
        };
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

  sendCredentials = () => {
    this.authService.registerUser(this.email.value, this.password.value).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error) => {
        this.message = error.message;
        this.chRef.markForCheck();
      },
    );
  };
}
