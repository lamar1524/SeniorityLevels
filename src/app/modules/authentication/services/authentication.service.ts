import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUserValues } from '@core/interfaces';
import { User } from 'firebase';
import 'firebase/database';
import { from, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import Reference = firebase.database.Reference;

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

  getUserRemotely = (): Observable<User> => from(this.firebaseAuth.currentUser).pipe(first());

  getTokenFromUser = (user: User): Observable<string> => from(user.getIdToken());

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

  provideAdditionalUserData = (values: IUserValues): Observable<Reference> => {
    return from(this.db.database.ref('users').push(values)).pipe(first());
  };
}
