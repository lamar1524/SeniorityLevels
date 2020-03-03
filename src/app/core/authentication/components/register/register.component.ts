import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { auth } from 'firebase';
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
  equal;
  constructor() {
    this.equal = this.validateEquality;
    this.caption = 'Homepage';
    this.title = 'Join us';
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    this.registerForm.addControl('repeatPassword', new FormControl('', [Validators.required, this.validateEquality.bind(this)]));
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
    auth().createUserWithEmailAndPassword(this.email.value, this.password.value);
  }
}
