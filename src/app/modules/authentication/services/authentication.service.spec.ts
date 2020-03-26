import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';
import { of, Observable } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

import { IUserValues } from '@core/interfaces';
import { AuthenticationService } from '.';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let firebaseAuth: AngularFireAuth;
  let db: AngularFireDatabase;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireDatabase,
          useValue: {
            database: {
              ref: () => ({ set: () => of({}) }),
            },
          },
        },
        {
          provide: AngularFireAuth,
          useValue: {
            signInWithEmailAndPassword: () => {},
            signOut: () => {},
            createUserWithEmailAndPassword: () => {},
            currentUser: {} as User,
          },
        },
      ],
    }),
  );

  beforeEach(() => {
    service = TestBed.get(AuthenticationService);
    firebaseAuth = TestBed.get(AngularFireAuth);
    db = TestBed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn method', () => {
    const email = 'email';
    const password = 'password';

    beforeEach(() => {
      spyOn(firebaseAuth, 'signInWithEmailAndPassword').and.returnValue(new Promise<UserCredential>(() => ({} as UserCredential)));
    });

    it('should call signInWithEmailAndPassword', () => {
      service.signIn(email, password);
      expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    });

    it('should return observable', () => {
      const result = service.signIn('', '');
      expect(result instanceof Observable).toEqual(true);
    });
  });

  describe('getUserRemotely method', () => {
    it('should return observable', () => {
      firebaseAuth.currentUser = new Promise<User>(() => ({} as User));
      expect(service.getUserRemotely() instanceof Observable).toEqual(true);
    });
  });

  describe('getTokenFromUser method', () => {
    const userMock = {
      getIdToken: () => new Promise<string>(() => ''),
      providerId: '',
    };
    it('should return observable', () => {
      expect(service.getTokenFromUser(userMock as User) instanceof Observable).toEqual(true);
    });

    it('should call getIdToken method', () => {
      spyOn(userMock, 'getIdToken').and.returnValue(new Promise<string>(() => ''));
      service.getTokenFromUser(userMock as User);
      expect(userMock.getIdToken).toHaveBeenCalled();
    });

    describe('putTokenInSessionStorage method', () => {
      it('should call setItem method', () => {
        spyOn(sessionStorage, 'setItem');
        service.putTokenInSessionStorage('token');
        expect(sessionStorage.setItem).toHaveBeenCalledWith('Bearer', 'token');
      });
    });

    describe('removeTokenFromSessionStorage method', () => {
      it('should call removeItem method', () => {
        spyOn(sessionStorage, 'removeItem');
        service.removeTokenFromSessionStorage();
        expect(sessionStorage.removeItem).toHaveBeenCalledWith('Bearer');
      });
    });

    describe('getTokenFromSessionStorage method', () => {
      it('should return proper string', () => {
        spyOn(sessionStorage, 'getItem').and.returnValue('token');
        expect(service.getTokenFromSessionStorage()).toEqual('token');
      });
    });
    describe('logout method', () => {
      it('should call signOut method', () => {
        spyOn(firebaseAuth, 'signOut');
        service.logout();
        expect(firebaseAuth.signOut).toHaveBeenCalled();
      });

      it('should call removeTokenFromSessionStorage method', () => {
        spyOn(service, 'removeTokenFromSessionStorage');
        service.logout();
        expect(service.removeTokenFromSessionStorage).toHaveBeenCalled();
      });
    });

    describe('registerUser method', () => {
      beforeEach(() => {
        spyOn(firebaseAuth, 'createUserWithEmailAndPassword').and.returnValue(new Promise<UserCredential>(() => ({} as UserCredential)));
      });

      it('should call createUserWithEmailAndPassword method', () => {
        service.registerUser('email', 'password');
        expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith('email', 'password');
      });

      it('should call return Observable', () => {
        expect(service.registerUser('', '') instanceof Observable).toEqual(true);
      });
    });

    describe('provideAdditionalUserData method', () => {
      const userDataMock: IUserValues = {
        email: '',
        firstName: '',
        lastName: '',
      };
      const dataReturned = {
        foo: 'bar',
      };

      beforeEach(() => {
        spyOn(db.database, 'ref').and.callFake(
          () =>
            ({
              set: () => of(dataReturned),
            } as any),
        );
      });

      it('should call ref method with proper arg', () => {
        service.provideAdditionalUserData(userDataMock, '1');
        expect(db.database.ref).toHaveBeenCalledWith('users/1');
      });

      it('should return proper data', (done) => {
        service.provideAdditionalUserData(userDataMock, '1').subscribe((value) => {
          expect(value).toBe(dataReturned as any);
          done();
        });
      });
    });
  });
});
