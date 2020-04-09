import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { User } from 'firebase';
import { throwError, Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

import { AuthenticationService } from '@modules/authentication';
import { loginUserFail, loginUserSuccess, AuthenticationEffects } from '@modules/authentication/store';
import { PopupService } from '@modules/reusable';
import * as authActions from '../../store/actions';

describe('Authentication effects', () => {
  let actions$: Observable<Action>;
  let scheduler: TestScheduler;
  let authEffects: AuthenticationEffects;
  let authService: SpyObj<AuthenticationService>;
  const additionalDataMock = {
    key: '',
    values: {
      firstName: '',
      lastName: '',
      email: '',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthenticationEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthenticationService,
          useValue: createSpyObj('authService', ['registerUser', 'provideAdditionalUserData', 'signIn', 'getUserRemotely']),
        },
        {
          provide: PopupService,
          useValue: {
            error: () => {},
            success: () => {},
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
      ],
    });
  });

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    authEffects = TestBed.get(AuthenticationEffects);
    authService = TestBed.get(AuthenticationService);
  });

  describe('register user effect', () => {
    const mockRegisterData = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    };
    const mockIdData = {
      user: {
        uid: '',
      },
    };

    it('Should return provideAdditionalData action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.registerUser(mockRegisterData) });
        authService.registerUser.and.returnValue(cold('-b|', { b: mockIdData }));
        const expected$ = '---c';
        expectObservable(authEffects.registerUser$).toBe(expected$, { c: authActions.provideAdditionalData(additionalDataMock) });
      });
    });

    it('Should return registerUserFail action when error thrown', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.registerUser(mockRegisterData) });
        authService.registerUser.and.returnValue(throwError(''));
        const expected$ = '--c';
        expectObservable(authEffects.registerUser$).toBe(expected$, { c: authActions.registerUserFail() });
      });
    });
  });

  describe('provideAdditionalData effect', () => {
    it('should return registerUserSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.provideAdditionalData(additionalDataMock) });
        authService.provideAdditionalUserData.and.returnValue(cold('-b|', { b: {} as any }));
        const expected$ = '---c';
        expectObservable(authEffects.provideAdditionalData$).toBe(expected$, { c: authActions.registerUserSuccess() });
      });
    });

    it('should return registerUserFail action when error thrown', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.provideAdditionalData(additionalDataMock) });
        authService.provideAdditionalUserData.and.returnValue(throwError(''));
        const expected$ = '--c';
        expectObservable(authEffects.provideAdditionalData$).toBe(expected$, { c: authActions.registerUserFail() });
      });
    });
  });

  describe('loginUser effect', () => {
    const mockLoginData = {
      email: '',
      password: '',
    };

    it('should return loadUserLogin effect', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.loginUser(mockLoginData) });
        authService.signIn.and.returnValue(cold('-b|', { b: {} as User }));
        const expected$ = '---c';
        expectObservable(authEffects.loginUser$).toBe(expected$, { c: authActions.loadUserLogin() });
      });
    });

    it('should return loginUserFail method', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.loginUser(mockLoginData) });
        authService.signIn.and.returnValue(cold('-b|', { b: null }));
        const expected$ = '---c';
        expectObservable(authEffects.loginUser$).toBe(expected$, { c: authActions.loginUserFail() });
      });
    });

    it('should return loginUserFail method when error thrown', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.loginUser(mockLoginData) });
        authService.signIn.and.returnValue(throwError(''));
        const expected$ = '--c';
        expectObservable(authEffects.loginUser$).toBe(expected$, { c: authActions.loginUserFail() });
      });
    });
  });

  describe('Load logged user effect', () => {
    it('Should return loginUserSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.loadUserLogin() });
        authService.getUserRemotely.and.returnValue(cold('-b|', { b: {} as User }));
        const expected$ = '---c';
        expectObservable(authEffects.loadUserLogin$).toBe(expected$, { c: loginUserSuccess({ user: {} as User }) });
      });
    });

    it('Should return loginUserFail action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.loadUserLogin() });
        authService.getUserRemotely.and.returnValue(cold('-b|', { b: null }));
        const expected$ = '---c';
        expectObservable(authEffects.loadUserLogin$).toBe(expected$, { c: loginUserFail() });
      });
    });

    it('Should return loginUserFail action when error thrown', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.loadUserLogin() });
        authService.getUserRemotely.and.returnValue(throwError(''));
        const expected$ = '--c';
        expectObservable(authEffects.loadUserLogin$).toBe(expected$, { c: loginUserFail() });
      });
    });
  });

  describe('loadUserRefresh effect ', () => {
    it('should return loginUserSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.loadUserRefresh() });
        authService.getUserRemotely.and.returnValue(cold('-b|', { b: {} as User }));
        const expected$ = '---c';
        expectObservable(authEffects.loadUserRefresh$).toBe(expected$, { c: loginUserSuccess({ user: {} as User }) });
      });
    });

    it('shoud return loginUserFail action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: authActions.loadUserRefresh() });
        authService.getUserRemotely.and.returnValue(cold('-b|', { b: null }));
        const expected$ = '---c';
        expectObservable(authEffects.loadUserRefresh$).toBe(expected$, { c: loginUserFail() });
      });
    });
  });
});
