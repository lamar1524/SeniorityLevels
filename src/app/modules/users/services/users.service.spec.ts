import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { of, Observable } from 'rxjs';

import { roleEnum } from '@core/enums/role.enum';
import { IUserValues } from '@core/interfaces';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let db: AngularFireDatabase;
  const userIdMock = 'userid';

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AngularFireDatabase,
          useValue: {
            database: {
              ref: () => ({ once: () => of({}), update: () => of({}) }),
            },
          },
        },
      ],
    }),
  );
  beforeEach(() => {
    service = TestBed.inject(UsersService);
    db = TestBed.inject(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

  describe('editCredentials method', () => {
    it('should call ref method', () => {
      spyOn(db.database, 'ref').and.callThrough();
      service.editCredentials(userIdMock, {} as IUserValues);
      expect(db.database.ref).toHaveBeenCalledWith(`users/${userIdMock}`);
    });
  });

  describe('editRole method', () => {
    it('should call ref method', () => {
      spyOn(db.database, 'ref').and.callThrough();
      service.editRole(userIdMock, roleEnum.admin);
      expect(db.database.ref).toHaveBeenCalledWith(`users/${userIdMock}`);
    });
  });
});
