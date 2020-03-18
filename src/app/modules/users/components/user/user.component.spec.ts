import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@core/material/material.module';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { default as data } from '@modules/skills/components/skills/data';
import { UsersService } from '@modules/users/services/users.service';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule, MockModule(MaterialModule)],
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
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data assignation', () => {
    it('should assign data variable properly', () => {
      expect(component.data).toEqual(data);
    });
  });
});
