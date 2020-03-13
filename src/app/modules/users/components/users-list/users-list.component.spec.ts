import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IUser } from '@core/interfaces';
import { MaterialModule } from '@core/material/material.module';
import { DISPLAYED_COLUMNS } from '@modules/users/consts/users.consts';
import { UsersService } from '@modules/users/services/users.service';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let service: UsersService;

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
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    service = TestBed.get(UsersService);
    spyOn(service, 'getUsersList').and.returnValue(of([{}] as IUser[]));
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
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

  describe('usersToLinkedUsers method', () => {
    const mockedArr = [{ key: '' }, { key: '' }, { key: '' }] as IUser[];

    it('should return array with same length as input', () => {
      expect(UsersListComponent.usersToLinkedUsers(mockedArr).length).toEqual(mockedArr.length);
    });

    it('each element should have proper profileLink', () => {
      UsersListComponent.usersToLinkedUsers(mockedArr).forEach((element) => {
        expect(element.profileLink).toEqual(`${ROUTES_PATH.otherUserProfile}/${element.key}`);
      });
    });
  });
});
