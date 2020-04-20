import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import { User } from 'firebase';
import 'firebase/database';
import { from, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import Reference = firebase.database.Reference;
import UserCredential = firebase.auth.UserCredential;

import { IBasicUser, IUserValues } from '@core/interfaces';
import * as authActions from '../store/actions';
import { AuthModuleState } from '../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth, private store: Store<AuthModuleState>) {}

  signIn = (email: string, password: string): Observable<User | UserCredential> =>
    from(this.firebaseAuth.signInWithEmailAndPassword(email, password)).pipe(first());

  getUserRemotely = (): Observable<IBasicUser> =>
    from(this.firebaseAuth.authState).pipe(
      first(),
      switchMap((fbUser) =>
        from(this.db.database.ref(`users/${fbUser.uid}`).once('value')).pipe(
          map((user) => ({ uid: fbUser.uid, email: user.val().email, role: user.val().role })),
        ),
      ),
    );

  logout = (): void => {
    this.firebaseAuth.signOut();
    this.store.dispatch(authActions.clearUser());
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
