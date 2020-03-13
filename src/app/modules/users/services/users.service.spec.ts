import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import { Observable } from 'rxjs';

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
              ref: () => {},
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

  // TODO blok, firebase is weird, same with getUserByKey
  // describe('getUsersList method', () => {
  //   it('should call ref method', () => {
  //     spyOn(db.database, 'ref')
  //       .withArgs('users')
  //       .and.callThrough();
  //     service.getUsersList();
  //   });
  // });
});
