import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockModule } from 'ng-mocks';

import { ROUTES_PATH } from '@constants/routes.constants';
import { registerUser, AuthModuleState } from '@modules/authentication/store';
import { SharedUiModule } from '@modules/reusable/shared-ui.module';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { of } from 'rxjs';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: Store<AuthModuleState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, BrowserAnimationsModule, MockModule(SharedUiModule)],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
            pipe: () => of({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
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
    it('Should dispatch proper action', () => {
      spyOn(store, 'dispatch');
      component.sendCredentials();
      expect(store.dispatch).toHaveBeenCalledWith(registerUser({ ...component.formData, password: component.password.value }));
    });
  });
});
