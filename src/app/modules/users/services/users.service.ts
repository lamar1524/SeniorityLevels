import { Injectable } from '@angular/core';
import { auth as firebaseAuth, database, User } from 'firebase';
import { from, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { IUser } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private db: firebase.database.Database;

  constructor() {
    this.db = database();
  }

  getCurrentUser = (): User => firebaseAuth().currentUser;

  getUsersList = (): Observable<IUser[]> =>
    from(this.db.ref('users').once('value')).pipe(
      first(),
      map((response) => {
        return Object.entries(response.val()).map(
          (element): IUser => ({ key: element[0], values: JSON.parse(JSON.stringify(element[1])) }),
        );
      }),
    );

  getUserByKey(userKey: string): Observable<IUser> {
    return from(this.db.ref(`users/${userKey}`).once('value')).pipe(
      first(),
      map((response) => ({
        key: userKey,
        values: response.val(),
      })),
    );
  }
}
