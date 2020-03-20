import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private currentUser: Subject<User>;

  constructor() {
    this.currentUser = new Subject<User>();
  }

  getUser = (): Observable<User> => {
    return this.currentUser.asObservable();
  };

  setUser = (user: User) => {
    this.currentUser.next(user);
  };

  clearUser() {
    this.currentUser.next(null);
  }
}
