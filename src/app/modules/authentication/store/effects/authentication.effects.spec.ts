// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AuthenticationService } from '@modules/authentication';
// import { PopupService } from '@modules/reusable';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { Action } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { TestScheduler } from 'rxjs/testing';
// import SpyObj = jasmine.SpyObj;
//
// import { AuthenticationEffects } from '@modules/authentication/store';
// import * as authActions from '../../store/actions';
// import createSpyObj = jasmine.createSpyObj;
//
// describe('Authentication effects', () => {
//   let actions$: Observable<Action>;
//   let scheduler: TestScheduler;
//   let authEffects: AuthenticationEffects;
//   let authService: SpyObj<AuthenticationService>;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       providers: [
//         AuthenticationEffects,
//         provideMockActions(() => actions$),
//         {
//           provide: AuthenticationService,
//           useValue: createSpyObj('authService', ['registerUser']),
//         },
//         {
//           provide: PopupService,
//           useValue: {
//             error: () => {},
//           },
//         },
//       ],
//     });
//   });
//
//   beforeEach(() => {
//     scheduler = new TestScheduler((actual, expected) => {
//       expect(actual).toEqual(expected);
//     });
//     authEffects = TestBed.get(AuthenticationEffects);
//     authService = TestBed.get(AuthenticationService);
//   });
//
//   describe('register user effect', () => {
//     describe('Positive register result', () => {
//       it('Should return provideAdditionalData action', () => {
//         scheduler.run(({ hot, cold, expectObservable }) => {
//           actions$ = hot('--a', { a: authActions.registerUser({} as any) });
//           authService.registerUser.and.returnValue(cold('-b|', { b: {} as any }));
//           const expected$ = '---c';
//           expectObservable(authEffects.registerUser$).toBe(expected$, { c: authActions.provideAdditionalData({} as any) });
//         });
//       });
//     });
//   });
// });
