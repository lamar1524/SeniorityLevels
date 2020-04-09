import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import { of, Observable } from 'rxjs';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let firebaseAuth: AngularFireAuth;
  let db: AngularFireDatabase;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireDatabase,
          useValue: {
            database: {
              ref: () => ({ once: () => of({}) }),
            },
          },
        },
        {
          provide: AngularFireAuth,
          useValue: { currentUser: {} as Promise<User> },
        },
      ],
    }),
  );
  beforeEach(() => {
    service = TestBed.get(UsersService);
    firebaseAuth = TestBed.get(AngularFireAuth);
    db = TestBed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentUser method', () => {
    it('it should return proper observable', () => {
      firebaseAuth.currentUser = new Promise<User>(() => {});
      expect(service.getCurrentUser() instanceof Observable).toEqual(true);
    });
  });

  describe('getUsersList method', () => {
    it('should return observable', () => {
      expect(service.getUsersList() instanceof Observable).toEqual(true);
    });

    it('should call db.database.ref method', () => {
      spyOn(db.database, 'ref').and.callThrough();
      service.getUsersList();
      expect(db.database.ref).toHaveBeenCalledWith('users');
    });
  });

  describe('getUserByKey method', () => {
    it('should return observable', () => {
      expect(service.getUserByKey('') instanceof Observable).toEqual(true);
    });

    it('should call db.database.ref method', () => {
      spyOn(db.database, 'ref').and.callThrough();
      service.getUserByKey('test');
      expect(db.database.ref).toHaveBeenCalledWith('users/test');
    });
  });
});
