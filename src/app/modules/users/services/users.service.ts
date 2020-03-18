import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import 'firebase/database';
import { from, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ISeniority, IUser, IUserValues } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {}

  getCurrentUser = (): Observable<User> => from(this.firebaseAuth.currentUser).pipe(first());

  getUsersList = (): Observable<IUser[]> =>
    from(this.db.database.ref('users').once('value')).pipe(
      first(),
      map((response) => {
        return Object.entries(response.val()).map((element): IUser => ({ key: element[0], values: element[1] as IUserValues }));
      }),
    );

  getUserByKey(userKey: string): Observable<IUser> {
    return from(this.db.database.ref(`users/${userKey}`).once('value')).pipe(
      first(),
      map((response) => ({
        key: userKey,
        values: response.val(),
      })),
    );
  }
}
