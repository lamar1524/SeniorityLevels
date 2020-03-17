import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ICategoryProgress, ISubCategoryProgress } from '@core/interfaces';
import { SkillsComponent } from '@modules/users/components';
import { User } from 'firebase';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';

import { default as data } from '@modules/users/components/skills/data';
import { UsersService } from '@modules/users/services/users.service';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent, MockComponent(SkillsComponent)],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getCurrentUser: () => of({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    usersService = TestBed.get(UsersService);
    spyOn(usersService, 'getCurrentUser').and.returnValue(of({} as User));
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCurrentUser method', () => {
    expect(usersService.getCurrentUser).toHaveBeenCalled();
  });

  describe('data assignation', () => {
    it('should assign data variable properly', () => {
      expect(component.data).toEqual(data);
    });
  });

  describe('choseCategory method', () => {
    it('should set chosenCategory list properly', () => {
      const mockSubCategories = {} as ICategoryProgress;
      component.chooseCategory(mockSubCategories);
      expect(component.chosenCategory).toEqual(mockSubCategories);
      expect(component.skillVisibility).toEqual(true);
    });
  });

  describe('hideSkill method', () => {
    it('should hide skill window', () => {
      component.hideSkill();
      expect(component.skillVisibility).toEqual(false);
    });
  });
});
