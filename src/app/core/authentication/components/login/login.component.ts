import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { auth as firebaseAuth } from 'firebase';

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

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.title = 'Login';
    this.caption = 'No account yet? Register here';
  }

  sendCredentials = () => {
    firebaseAuth()
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        this.router.navigate(['/register']);
      });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
