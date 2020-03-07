import { Injectable } from '@angular/core';
import { auth as firebaseAuth, User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getCurrentUser = (): User => firebaseAuth().currentUser;
}
