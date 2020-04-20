import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { MaterialModule } from '@core/material/material.module';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import { SharedUiModule } from '@modules/reusable/shared-ui.module';
import { UserComponent } from '..';
import { UsersService } from '../../services';
import * as usersActions from '../../store/actions';
import { UsersModuleState } from '../../store/reducers';
import { selectTotalSkillsProgress } from '../../store/selectors';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let usersService: UsersService;
  let usersStore: Store<UsersModuleState>;
  let authStore: Store<AuthModuleState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule, MockModule(MaterialModule), MockModule(SharedUiModule)],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
            select: () => of({}),
          },
        },
        {
          provide: AngularFireDatabase,
          useValue: {},
        },
        {
          provide: AngularFireAuth,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    usersStore = TestBed.inject(Store);
    authStore = TestBed.inject(Store);
    spyOn(usersStore, 'dispatch');
    spyOn(usersStore, 'select').and.returnValue(of({}));
    usersService = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('selecting values ', () => {
    it('should selectCurrentUser', () => {
      expect(authStore.select).toHaveBeenCalledWith(selectCurrentUser);
    });

    it('should select total skilsl progress', () => {
      expect(usersStore.select).toHaveBeenCalledWith(selectTotalSkillsProgress);
    });
  });

  describe('dispatching actions', () => {
    it('should dispatch loadTotalProgress action', (done) => {
      authStore.select(selectCurrentUser).subscribe((res) => {
        expect(usersStore.dispatch).toHaveBeenCalledWith(usersActions.loadTotalProgress({ userId: res.uid }));
        done();
      });
    });
  });
});
