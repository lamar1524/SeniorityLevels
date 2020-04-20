import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { SharedUiModule } from '@modules/reusable';
import { UserProfileComponent } from '..';
import * as usersActions from '../../store/actions';
import { UsersModuleState } from '../../store/reducers';
import { selectOtherUserDetails, selectOtherUserSkillProgress, selectSkillsLoading } from '../../store/selectors';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let store: Store<UsersModuleState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [RouterTestingModule, MockModule(SharedUiModule)],
      providers: [
        {
          provide: AngularFireDatabase,
          useValue: {},
        },
        {
          provide: AngularFireAuth,
          useValue: {},
        },
        {
          provide: Store,
          useValue: {
            select: () => of({}),
            dispatch: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(of({}));
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign imageSource properly', () => {
    expect(component.imgSrc).toEqual('assets/img/mock/profile_mock.jpg');
  });

  describe('dispatching proper actions', () => {
    it('should dispatch loadOtherUserDetails action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(usersActions.loadOtherUserDetails({ userId: component.userKey }));
    });

    it('should dispatch loadSkillsWithTitles action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(usersActions.loadSkillsWithTitles({ userId: component.userKey }));
    });
  });

  describe('selecting proper values', () => {
    it('should select other users details', () => {
      expect(store.select).toHaveBeenCalledWith(selectOtherUserDetails);
    });

    it('should select other users skill progress', () => {
      expect(store.select).toHaveBeenCalledWith(selectOtherUserSkillProgress);
    });

    it('should select skills loading state', () => {
      expect(store.select).toHaveBeenCalledWith(selectSkillsLoading);
    });
  });
});
