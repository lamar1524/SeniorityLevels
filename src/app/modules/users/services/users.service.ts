import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { from, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import { ENDPOINTS } from '@constants/endpoints.constants';
import { IUser, IUserValues } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

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

  deleteAccount(userId: string) {
    return this.http.request('delete', ENDPOINTS.deleteUser, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': '*',
      }),
      body: { userId },
    });
  }

  editCredentials(userId: string, data: IUserValues) {
    return from(this.db.database.ref(`users/${userId}`).update(data));
  }
}
