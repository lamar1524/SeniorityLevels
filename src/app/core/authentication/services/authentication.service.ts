import { Injectable } from '@angular/core';
import { auth as firebaseAuth, database } from 'firebase';
import { from, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY: string;
  private db: firebase.database.Database;
  constructor() {
    this.TOKEN_KEY = 'Bearer';
    this.db = database();
  }

  signIn = (email: string, password: string): Observable<any> =>
    from(firebaseAuth().signInWithEmailAndPassword(email, password)).pipe(first());

  getTokenRemotely = (): Observable<any> => from(firebaseAuth().currentUser.getIdToken(true)).pipe(first());

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

  registerUser = (email: string, password: string): Observable<any> =>
    from(firebaseAuth().createUserWithEmailAndPassword(email, password)).pipe(first());

  provideAdditionalUserData = (userData) => {
    return from(this.db.ref('users').push(userData)).pipe(first());
  };
}
