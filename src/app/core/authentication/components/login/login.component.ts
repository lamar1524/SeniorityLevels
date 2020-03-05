import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, throwError } from 'rxjs';

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

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private authService: AuthenticationService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.title = 'Login';
    this.errorMessage = '';
    this.caption = 'No account yet? Register here';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  sendCredentials = async () => {
    this.authService.signIn(this.email.value, this.password.value).subscribe(
      () => {
        from(this.authService.getTokenRemotely()).subscribe((token) => {
          this.authService.putTokenInSessionStorage(token);
          this.router.navigate(['/users']);
        },
        error => {
          throwError(error);
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };
}
