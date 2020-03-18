import { Injectable } from '@angular/core';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private currentUser: User;

  constructor() {}

  getUser = (): User => this.currentUser;

  setUser = (user: User) => {
    this.currentUser = user;
  };
}
