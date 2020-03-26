import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { IUser } from '@core/interfaces';
import { SharedUiModule } from '@modules/reusable';
import { SkillsService } from '@modules/skills';
import { UserProfileComponent } from '..';
import { UsersService } from '../../services';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [RouterTestingModule, MockModule(SharedUiModule)],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUserByKey: () => of({}),
          },
        },
        {
          provide: SkillsService,
          useValue: {
            getAllSkillsWithTitles: () => of({}),
            getSummaryProgress: () => of({}),
          },
        },
        {
          provide: AngularFireAuth,
          useValue: {},
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
