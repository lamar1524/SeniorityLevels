import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private currentUser: BehaviorSubject<User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.currentUser = new BehaviorSubject<User>(null);
  }

  getUser = (): Observable<User> => {
    if (this.currentUser.getValue() === null) {
      this.firebaseAuth.authState.pipe(first()).subscribe(
        (user) => {
          this.setUser(user);
        },
        () => this.setUser(null),
      );
    }
    return this.currentUser.asObservable();
  };

  setUser = (user: User) => {
    this.currentUser.next(user);
  };

  clearUser() {
    this.currentUser.next(null);
  }
}
