import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'firebase';
import { MockModule } from 'ng-mocks';
import { of, Observable } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

import { ROUTES_PATH } from '@constants/routes.constants';
import { SharedUiModule } from '@modules/reusable';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { AuthenticationService } from '../../services';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, BrowserAnimationsModule, MockModule(SharedUiModule)],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            signIn: () => of({}),
            getUserRemotely: () => of({}),
            getTokenFromUser: () => of({}),
            putTokenInSessionStorage: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('login form', () => {
    it('loginForm should be instance of AppFormGroup', () => {
      expect(component.loginForm instanceof AppFormGroup).toEqual(true);
    });

    it('should assign 2 fields to form group', () => {
      expect(Object.keys(component.loginForm.controls).length).toBe(2);
    });

    it('form controls should be instances of AppFormControl', () => {
      Object.values(component.loginForm.controls).forEach((control) => {
        expect(control instanceof AppFormControl).toEqual(true);
      });
    });

    it('login form values should have value in type of string ', () => {
      expect(typeof component.email.value).toEqual('string');
      expect(typeof component.password.value).toEqual('string');
    });
  });

  describe('routes constant', () => {
    it('routes should be instance of RoutesConst', () => {
      expect(component.routes).toEqual(ROUTES_PATH);
    });
  });

  describe('sendCredentials method', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.stub();
    });

    it('should call authService signIn method with proper args', () => {
      spyOn(authService, 'signIn').and.returnValue(of({}) as Observable<User | UserCredential>);
      component.sendCredentials();
      expect(authService.signIn).toHaveBeenCalledWith(component.email.value, component.password.value);
    });

    it('should call handleCredentialsSuccess method', () => {
      spyOn(authService, 'signIn').and.returnValue(of({}) as Observable<User | UserCredential>);
      spyOn(component, 'handleCredentialsSuccess');
      component.sendCredentials();
      expect(component.handleCredentialsSuccess).toHaveBeenCalled();
    });
  });

  describe('handleCredentialsSuccess method', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.stub();
    });
    it('should call getUserRemotely', () => {
      spyOn(authService, 'getUserRemotely').and.returnValue(of({}) as Observable<User>);
      component.handleCredentialsSuccess();
      expect(authService.getUserRemotely).toHaveBeenCalled();
    });

    it('should call getTokenFromUser', () => {
      spyOn(authService, 'getUserRemotely').and.returnValue(of({}) as Observable<User>);
      spyOn(authService, 'getTokenFromUser').and.returnValue(of({}) as Observable<string>);
      component.handleCredentialsSuccess();
      expect(authService.getTokenFromUser).toHaveBeenCalled();
    });
  });
});
