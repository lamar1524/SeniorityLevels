import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import 'firebase/database';
import { from, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY: string;

  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
    this.TOKEN_KEY = 'Bearer';
  }

  signIn = (email: string, password: string): Observable<any> =>
    from(this.firebaseAuth.signInWithEmailAndPassword(email, password)).pipe(first());

  getTokenRemotely = (): Observable<User> => from(this.firebaseAuth.currentUser).pipe(first());

  putTokenInSessionStorage = (token): void => {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  };

  removeTokenFromSessionStorage = (): void => {
    sessionStorage.removeItem(this.TOKEN_KEY);
  };

  getTokenFromSessionStorage = (): string => sessionStorage.getItem(this.TOKEN_KEY);

  logout = (): void => {
    this.firebaseAuth.signOut();
    this.removeTokenFromSessionStorage();
  };

  isLoggedIn = async (): Promise<boolean> => {
    return !!this.getTokenFromSessionStorage() && !!(await this.firebaseAuth.currentUser);
  };

  registerUser = (email: string, password: string): Observable<any> =>
    from(this.firebaseAuth.createUserWithEmailAndPassword(email, password)).pipe(first());

  provideAdditionalUserData = (values) => {
    return from(this.db.database.ref('users').push(values)).pipe(first());
  };
}
