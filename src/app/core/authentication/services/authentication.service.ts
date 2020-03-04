import { Injectable } from '@angular/core';

import { auth as firebaseAuth } from 'firebase';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly TOKEN_KEY: string;
  constructor() {
    this.TOKEN_KEY = 'Bearer';
  }
  signIn = (email: string, password: string) => from(firebaseAuth().signInWithEmailAndPassword(email, password));
  getTokenRemotely = () => firebaseAuth().currentUser.getIdToken(true);
  putTokenInSessionStorage = (token) => {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  };
  removeTokenFromSessionStorage = () => {
    sessionStorage.removeItem(this.TOKEN_KEY);
  };
  logout = () => {
    firebaseAuth().signOut();
    this.removeTokenFromSessionStorage();
  };
  getToken = () => sessionStorage.getItem(this.TOKEN_KEY);
  isLoggedIn = () => {
    return !!this.getToken() && !!firebaseAuth().currentUser;
  };

  registerUser = (email: string, password: string) => from(firebaseAuth().createUserWithEmailAndPassword(email, password));
}
