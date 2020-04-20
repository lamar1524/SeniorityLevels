import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { from, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { IUser, IUserValues } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private db: AngularFireDatabase) {}

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
  // TODO - creating cloud function for deleting users and call it
  deleteAccountByUser() {}
}
