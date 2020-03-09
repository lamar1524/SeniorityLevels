import { Injectable } from '@angular/core';
import { auth as firebaseAuth, database, User } from 'firebase';
import { from, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { AppUser } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private db: firebase.database.Database;

  constructor() {
    this.db = database();
  }

  getCurrentUser = (): User => firebaseAuth().currentUser;

  getUsersList = (): Observable<AppUser[]> =>
    from(this.db.ref('users').once('value')).pipe(
      first(),
      map((response) => {
        const arr: AppUser[] = [];
        response.forEach((element) => {
          arr.push({ key: element.key, values: element.val() });
        });
        return arr;
      }),
    );

  getUserByKey(userKey: string): Observable<AppUser> {
    return from(this.db.ref(`users/${userKey}`).once('value')).pipe(
      first(),
      map((response) => ({
        key: userKey,
        values: response.val(),
      })),
    );
  }
}
