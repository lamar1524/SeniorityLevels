// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MockModule } from 'ng-mocks';
// import { of } from 'rxjs';
//
// import { MaterialModule } from '@core/material/material.module';
// import { SharedUiModule } from '@modules/reusable/shared-ui.module';
// import { SkillsService } from '@modules/skills/services/skills.service';
// import { UserComponent } from '..';
// import { UsersService } from '../../services';
//
// describe('UserComponent', () => {
//   let component: UserComponent;
//   let fixture: ComponentFixture<UserComponent>;
//   let usersService: UsersService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [UserComponent],
//       imports: [RouterTestingModule, MockModule(MaterialModule), MockModule(SharedUiModule)],
//       providers: [
//         {
//           provide: UsersService,
//           useValue: {
//             getCurrentUser: () => of({}),
//           },
//         },
//         {
//           provide: SkillsService,
//           useValue: { getAllSkillsValues: () => of({}), getProgressOf: () => {} },
//         },
//         {
//           provide: AngularFireAuth,
//           useValue: {
//             authState: of({}),
//           },
//         },
//       ],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     usersService = TestBed.get(UsersService);
//     fixture = TestBed.createComponent(UserComponent);
//     component = fixture.componentInstance;
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
