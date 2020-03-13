import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IUser } from '@core/interfaces';
import { of } from 'rxjs';

import { UsersService } from '@modules/users/services/users.service';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUserByKey: () => of({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    usersService = TestBed.get(UsersService);
    spyOn(usersService, 'getUserByKey').and.returnValue(of({} as IUser));
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserByKey method', () => {
    expect(usersService.getUserByKey).toHaveBeenCalled();
  });

  it('should assign imageSource properly', () => {
    expect(component.imgSrc).toEqual('assets/img/mock/profile_mock.jpg');
  });
});
