import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import createSpyObj = jasmine.createSpyObj;

import { ROUTES_PATH } from '@constants/routes.constants';
import { IUser } from '@core/interfaces';
import { MaterialModule } from '@core/material/material.module';
import { UsersListComponent } from '..';
import { DISPLAYED_COLUMNS } from '../../consts';
import { UsersService } from '../../services';
import { UsersModuleState } from '../../store/reducers';
import { selectUsersList } from '../../store/selectors';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let service: UsersService;
  let store: Store<UsersModuleState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [MaterialModule, RouterTestingModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsersList: () => of([{}] as IUser[]),
          },
        },
        {
          provide: AngularFireAuth,
          useValue: {},
        },
        {
          provide: Store,
          useValue: createSpyObj('store', ['dispatch', 'select']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(UsersService);
    spyOn(service, 'getUsersList').and.returnValue(of([{}] as IUser[]));
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign routes properly', () => {
    expect(component.routes).toEqual(ROUTES_PATH);
  });

  it('should assign displayedColumns properly', () => {
    expect(component.displayedColumns).toEqual(DISPLAYED_COLUMNS);
  });

  it('should dispatch proper action to load users list', () => {
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should select users from store', () => {
    expect(store.select).toHaveBeenCalledWith(selectUsersList);
  });
});
