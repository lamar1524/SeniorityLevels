import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { PopupService } from '@modules/reusable/services';
import { SharedUiModule } from '@modules/reusable/shared-ui.module';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { AuthenticationService } from '../../services';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, BrowserAnimationsModule, MockModule(SharedUiModule)],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            registerUser: () => {},
            provideAdditionalUserData: () => {},
          },
        },
        {
          provide: PopupService,
          useValue: {
            showPopup: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    authService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('register form', () => {
    it('registerForm should be instance of AppFormGroup', () => {
      expect(component.registerForm instanceof AppFormGroup).toEqual(true);
    });

    it('should assign 5 fields to form group', () => {
      expect(Object.keys(component.registerForm.controls).length).toBe(5);
    });

    it('form controls should be instances of AppFormControl', () => {
      Object.values(component.registerForm.controls).forEach((control) => {
        expect(control instanceof AppFormControl).toEqual(true);
      });
    });

    it('registerForm values should have value in type of string ', () => {
      Object.values(component.registerForm.controls).forEach((control) => {
        expect(typeof control.value).toEqual('string');
      });
    });
  });

  describe('Routes const', () => {
    it('should assign routes const properly', () => {
      expect(component.routes).toEqual(ROUTES_PATH);
    });
  });

  describe('sendCredentials method', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.stub();
    });

    it('should call registerUser method', () => {
      spyOn(authService, 'registerUser').and.returnValue(of({ user: { uid: 1 } }));
      spyOn(authService, 'provideAdditionalUserData').and.returnValue(of({}) as any);
      component.sendCredentials();
      expect(authService.registerUser).toHaveBeenCalledWith(component.email.value, component.password.value);
    });
  });
});
