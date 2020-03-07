import { Injectable } from '@angular/core';
import { auth as firebaseAuth, database, User } from 'firebase';
import { from } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private db: firebase.database.Database;
  constructor() {
    this.db = database();
  }

  getCurrentUser = (): User => firebaseAuth().currentUser;

  getUsersList = () =>
    from(this.db.ref('users').once('value')).pipe(
      first(),
      map((response) => {
        const arr = [];
        response.forEach((element) => {
          arr.push({
            key: element.key,
            values: element.val(),
          });
        });
        return arr;
      }),
    );

  getUserByKey(key: string) {
    return from(this.db.ref(`users/${key}`).once('value')).pipe(
      first(),
      map((response) => response.val()),
    );
  }
}
