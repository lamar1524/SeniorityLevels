import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private currentUser: User;

  constructor(private firebaseAuth: AngularFireAuth) {}

  getUser = (): Observable<User> => {
    if (this.currentUser !== undefined) {
      return of(this.currentUser);
    }
    return this.firebaseAuth.authState.pipe(tap((user) => this.currentUser = user));
  };

  setUser = (user: User) => {
    this.currentUser = user;
  };
}
