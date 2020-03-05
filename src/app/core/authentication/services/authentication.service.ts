import { Injectable } from '@angular/core';
import { auth as firebaseAuth } from 'firebase';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY: string;

  constructor() {
    this.TOKEN_KEY = 'Bearer';
  }

  signIn = (email: string, password: string): Observable<any> => from(firebaseAuth().signInWithEmailAndPassword(email, password));

  getTokenRemotely = (): Promise<any> => firebaseAuth().currentUser.getIdToken(true);

  putTokenInSessionStorage = (token): void => {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  };

  removeTokenFromSessionStorage = (): void => {
    sessionStorage.removeItem(this.TOKEN_KEY);
  };

  getTokenFromSessionStorage = (): string => sessionStorage.getItem(this.TOKEN_KEY);

  logout = (): void => {
    firebaseAuth().signOut();
    this.removeTokenFromSessionStorage();
  };

  isLoggedIn = (): boolean => !!this.getTokenFromSessionStorage() && !!firebaseAuth().currentUser;

  registerUser = (email: string, password: string): Observable<any> => from(firebaseAuth().createUserWithEmailAndPassword(email, password));
}
