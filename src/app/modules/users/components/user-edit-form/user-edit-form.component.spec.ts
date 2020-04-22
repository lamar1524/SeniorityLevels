import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

import { SharedUiModule } from '@modules/reusable';
import { UsersModuleState } from '@modules/users/store';
import { UserEditFormComponent } from './user-edit-form.component';

describe('UserEditFormComponent', () => {
  let component: UserEditFormComponent;
  let fixture: ComponentFixture<UserEditFormComponent>;
  let store: SpyObj<Store<UsersModuleState>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditFormComponent],
      imports: [MockModule(FormsModule), MockModule(ReactiveFormsModule), MockModule(SharedUiModule)],
      providers: [
        {
          provide: Store,
          useValue: createSpyObj('store', ['dispatch', 'select']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store) as SpyObj<Store<UsersModuleState>>;
    store.select.and.returnValue(of({}));
    fixture = TestBed.createComponent(UserEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
