import { Injectable } from '@angular/core';
import { auth as firebaseAuth, database, User } from 'firebase';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

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
      map((response) => {
        const arr = [];
        response.forEach((element) => {
          arr.push(element.val());
        });
        return arr;
      }),
    );
}
