import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import 'firebase/database';
import { from, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import Reference = firebase.database.Reference;
import UserCredential = firebase.auth.UserCredential;

import { IUserValues } from '@core/interfaces';
import { DataSharingService } from '@shared/services/data-sharing.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY: string;

  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth, private dataSharingService: DataSharingService) {
    this.TOKEN_KEY = 'Bearer';
  }

  signIn = (email: string, password: string): Observable<User | UserCredential> =>
    from(this.firebaseAuth.signInWithEmailAndPassword(email, password)).pipe(first());

  getUserRemotely = (): Observable<User> =>
    from(this.firebaseAuth.currentUser).pipe(
      first(),
      tap((user) => this.dataSharingService.setUser(user)),
    );

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
    this.dataSharingService.clearUser();
    this.removeTokenFromSessionStorage();
  };

  isLoggedIn = (): Observable<boolean> => {
    return this.firebaseAuth.authState.pipe(map((user) => user !== null));
  };

  registerUser = (email: string, password: string): Observable<any> =>
    from(this.firebaseAuth.createUserWithEmailAndPassword(email, password)).pipe(first());

  provideAdditionalUserData = (values: IUserValues, userId: string): Observable<Reference> => {
    return from(this.db.database.ref(`users/${userId}`).set(values)).pipe(first());
  };
}
