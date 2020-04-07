import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { loginUser, AuthModuleState } from '@modules/authentication/store';
import { Store } from '@ngrx/store';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { SharedUiModule } from '@modules/reusable';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let store: Store<AuthModuleState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, BrowserAnimationsModule, MockModule(SharedUiModule)],
      providers: [
        {
          provide: Store,
          useValue: {
            pipe: () => of({}),
            dispatch: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
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

  describe('send credentials method', () => {
    it('should dispatch proper action', () => {
      spyOn(store, 'dispatch');
      component.sendCredentials();
      expect(store.dispatch).toHaveBeenCalledWith(loginUser({ email: component.email.value, password: component.password.value }));
    });
  });
});
