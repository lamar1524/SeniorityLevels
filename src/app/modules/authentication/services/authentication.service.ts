import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import 'firebase/database';
import { from, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import Reference = firebase.database.Reference;
import UserCredential = firebase.auth.UserCredential;

import { IUserValues } from '@core/interfaces';
import { DataSharingService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth, private dataSharingService: DataSharingService) {}

  signIn = (email: string, password: string): Observable<User | UserCredential> =>
    from(this.firebaseAuth.signInWithEmailAndPassword(email, password)).pipe(first());

  getUserRemotely = (): Observable<User> => from(this.firebaseAuth.currentUser).pipe(first());

  logout = (): void => {
    this.firebaseAuth.signOut();
    this.dataSharingService.clearUser();
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
