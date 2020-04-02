// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
//
// import { ROUTES_PATH } from '@constants/routes.constants';
// import { IUser } from '@core/interfaces';
// import { MaterialModule } from '@core/material/material.module';
// import { UsersListComponent } from '..';
// import { DISPLAYED_COLUMNS } from '../../consts';
// import { UsersService } from '../../services';
//
// describe('UsersListComponent', () => {
//   let component: UsersListComponent;
//   let fixture: ComponentFixture<UsersListComponent>;
//   let service: UsersService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [UsersListComponent],
//       imports: [MaterialModule, RouterTestingModule],
//       providers: [
//         {
//           provide: UsersService,
//           useValue: {
//             getUsersList: () => of([{}] as IUser[]),
//           },
//         },
//         {
//           provide: AngularFireAuth,
//           useValue: {},
//         },
//       ],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     service = TestBed.get(UsersService);
//     spyOn(service, 'getUsersList').and.returnValue(of([{}] as IUser[]));
//     fixture = TestBed.createComponent(UsersListComponent);
//     component = fixture.componentInstance;
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should assign routes properly', () => {
//     expect(component.routes).toEqual(ROUTES_PATH);
//   });
//
//   it('should assign displayedColumns properly', () => {
//     expect(component.displayedColumns).toEqual(DISPLAYED_COLUMNS);
//   });
//
//   describe('usersToLinkedUsers method', () => {
//     const mockedArr = [{ key: '' }, { key: '' }, { key: '' }] as IUser[];
//
//     it('should return array with same length as input', () => {
//       expect(UsersListComponent.usersToLinkedUsers(mockedArr).length).toEqual(mockedArr.length);
//     });
//
//     it('each element should have proper profileLink', () => {
//       UsersListComponent.usersToLinkedUsers(mockedArr).forEach((element) => {
//         expect(element.profileLink).toEqual(`${ROUTES_PATH.otherUserProfile}/${element.key}`);
//       });
//     });
//   });
// });
