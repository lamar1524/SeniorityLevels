import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTES_PATH } from '@constants/routes.constants';

import { MaterialModule } from '@core/material/material.module';
import { AuthenticationService } from '@modules/authentication';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { User } from 'firebase';
import { of, throwError, Observable } from 'rxjs';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MaterialModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            signIn: () => of({}),
            getTokenRemotely: () => of({}),
            putTokenInSessionStorage: () => {},
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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
    it('should call authService signIn method', () => {
      spyOn(authService, 'signIn').and.returnValue(of({}));
      component.sendCredentials();
      expect(authService.signIn).toHaveBeenCalledWith(component.email.value, component.password.value);
    });

    it('should call handleCredentialSuccess method', () => {
      spyOn(authService, 'signIn').and.returnValue(of({}));
      spyOn(component, 'handleCredentialSuccess');
      component.sendCredentials();
      expect(component.handleCredentialSuccess).toHaveBeenCalled();
    });

    it('should call handleCredentialError method', () => {
      spyOn(authService, 'signIn').and.returnValue(throwError(''));
      spyOn(component, 'handleCredentialsError');
      component.sendCredentials();
      expect(component.handleCredentialsError).toHaveBeenCalled();
    });
  });

  describe('handleCredentialError method', () => {
    it('should set errorMessage value', () => {
      const message = 'Test';
      component.handleCredentialsError(message);
      expect(component.errorMessage).toEqual(message);
    });
  });
  describe('handleCredentialSuccess method', () => {
    it('should put token into session storage', () => {
      spyOn(authService, 'getTokenRemotely').and.returnValue(of({}) as Observable<User>);
      spyOn(authService, 'putTokenInSessionStorage');
      component.handleCredentialSuccess();
      expect(authService.getTokenRemotely).toHaveBeenCalled();
    });
  });
});
