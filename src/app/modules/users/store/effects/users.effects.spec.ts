import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { throwError, Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

import { roleEnum } from '@core/enums/role.enum';
import { AuthenticationService } from '@modules/authentication';
import { PopupService } from '@modules/reusable';
import { SkillsService } from '@modules/skills';
import { UsersService } from '../../services';
import * as usersActions from '../../store/actions';
import { loadOtherUserDetailsFail } from '../actions';
import { UsersEffects } from '../effects';

describe('User effects', () => {
  let actions$: Observable<Action>;
  let scheduler: TestScheduler;
  let usersEffects: UsersEffects;
  let usersService: SpyObj<UsersService>;
  let skillsService: SpyObj<SkillsService>;
  const userIdMock = '1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        {
          provide: UsersService,
          useValue: createSpyObj('usersService', ['getCurrentUser', 'getUsersList', 'getUserByKey', 'deleteAccount']),
        },
        {
          provide: SkillsService,
          useValue: createSpyObj('skillsService', ['getAllSkillsValues', 'getProgressOf', 'getAllSkillsWithTitles', 'getSummaryProgress']),
        },
        {
          provide: AuthenticationService,
          useValue: createSpyObj('authService', ['logout']),
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
        {
          provide: Title,
          useValue: {
            setTitle: () => {},
          },
        },
      ],
    });
  });

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    usersEffects = TestBed.inject(UsersEffects);
    usersService = TestBed.inject(UsersService) as SpyObj<UsersService>;
    skillsService = TestBed.inject(SkillsService) as SpyObj<SkillsService>;
  });

  describe('loadTotalProgress$ effect', () => {
    it('should call proper action when success', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: usersActions.loadTotalProgress({ userId: userIdMock }) });
        skillsService.getProgressOf.and.returnValue({} as any);
        skillsService.getAllSkillsValues.and.returnValue(cold('-b|', { b: [] }));
        const expected$ = '---c';
        expectObservable(usersEffects.loadTotalProgress$).toBe(expected$, {
          c: usersActions.computeTotalProgressSuccess({ values: {} as any }),
        });
      });
    });

    it('should call proper action when success', () => {
      scheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('--a', { a: usersActions.loadTotalProgress({ userId: userIdMock }) });
        skillsService.getAllSkillsValues.and.returnValue(throwError(''));
        const expected$ = '--c';
        expectObservable(usersEffects.loadTotalProgress$).toBe(expected$, { c: usersActions.computeTotalProgressFail() });
      });
    });
  });

  describe('loadOtherUserDetails$ effect', () => {
    it('should return loadOtherUserSuccess action', () => {
      const mockValues = { firstName: '', lastName: '', email: '', role: roleEnum.user };
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: usersActions.loadOtherUserDetails({ userId: userIdMock }) });
        usersService.getUserByKey.and.returnValue(cold('-b|', { b: { key: userIdMock, values: mockValues } }));
        const expected$ = '---c';
        expectObservable(usersEffects.loadOtherUserDetails$).toBe(expected$, {
          c: usersActions.loadOtherUserSuccess({ user: mockValues }),
        });
      });
    });
    it('should return loadOtherUserSuccess action', () => {
      scheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('--a', { a: usersActions.loadOtherUserDetails({ userId: userIdMock }) });
        usersService.getUserByKey.and.returnValue(throwError(''));
        const expected$ = '--c';
        expectObservable(usersEffects.loadOtherUserDetails$).toBe(expected$, { c: loadOtherUserDetailsFail() });
      });
    });
  });

  describe('loadSkillsWithTitles$ effect', () => {
    it('should return loadSkillsWithTitlesSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: usersActions.loadSkillsWithTitles({ userId: userIdMock }) });
        skillsService.getSummaryProgress.and.returnValue({} as any);
        skillsService.getAllSkillsWithTitles.and.returnValue(cold('-b|', { b: [] as any }));
        const expected$ = '---c';
        expectObservable(usersEffects.loadSkillsWithTitles$).toBe(expected$, {
          c: usersActions.loadSkillsWithTitlesSuccess({ values: {} as any }),
        });
      });
    });

    it('should return loadSkillsWithTitlesFail action', () => {
      scheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('--a', { a: usersActions.loadSkillsWithTitles({ userId: userIdMock }) });
        skillsService.getAllSkillsWithTitles.and.returnValue(throwError(''));
        const expected$ = '--c';
        expectObservable(usersEffects.loadSkillsWithTitles$).toBe(expected$, { c: usersActions.loadSkillsWithTitlesFail() });
      });
    });
  });

  describe('loadUsersList$ effect', () => {
    it('should return loadUsersListSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('--a', { a: usersActions.loadUsersList() });
        usersService.getUsersList.and.returnValue(cold('-b|', { b: [] as any }));
        const expected$ = '---c';
        expectObservable(usersEffects.loadUsersList$).toBe(expected$, { c: usersActions.loadUsersListSuccess({ users: [] as any }) });
      });
    });

    it('should return loadUsersListFail action', () => {
      scheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('--a', { a: usersActions.loadUsersList() });
        usersService.getUsersList.and.returnValue(throwError(''));
        const expected$ = '--c';
        expectObservable(usersEffects.loadUsersList$).toBe(expected$, { c: usersActions.loadUsersListFail() });
      });
    });
  });

  describe('deleteUser$ effect', () => {
    it('should return deleteOtherUserSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const idMock = 'userId';
        actions$ = hot('--a', { a: usersActions.deleteUser({ userId: idMock, isCurrent: false }) });
        usersService.deleteAccount.and.returnValue(cold('-b|', { b: {} as any }));
        const expected$ = '---c';
        expectObservable(usersEffects.deleteUser$).toBe(expected$, { c: usersActions.deleteOtherUserSuccess() });
      });
    });

    it('should return deleteUserSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const idMock = 'userId';
        actions$ = hot('--a', { a: usersActions.deleteUser({ userId: idMock, isCurrent: true }) });
        usersService.deleteAccount.and.returnValue(cold('-b|', { b: {} as any }));
        const expected$ = '---c';
        expectObservable(usersEffects.deleteUser$).toBe(expected$, { c: usersActions.deleteUserSuccess() });
      });
    });

    it('should return deleteUserSuccess action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const idMock = 'userId';
        actions$ = hot('--a', { a: usersActions.deleteUser({ userId: idMock, isCurrent: true }) });
        usersService.deleteAccount.and.returnValue(cold('-#|'));
        const expected$ = '---c';
        expectObservable(usersEffects.deleteUser$).toBe(expected$, { c: usersActions.deleteUserFail() });
      });
    });
  });
});
