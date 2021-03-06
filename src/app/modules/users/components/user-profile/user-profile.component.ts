import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { roleEnum } from '@core/enums/role.enum';
import { IBasicUser, IRoutesConst, ISubCategoryValue, IUserValues } from '@core/interfaces';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import * as authActions from '@modules/authentication/store/actions';
import { DialogService } from '@modules/reusable';
import { seniorityEnum } from '@modules/skills';
import { deleteUser } from '../../store/actions';
import * as usersActions from '../../store/actions';
import { UsersModuleState } from '../../store/reducers';
import {
  selectDeletingUser,
  selectOtherUserDetails,
  selectOtherUserSkillProgress,
  selectRoleLoading,
  selectSkillsLoading,
} from '../../store/selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnDestroy {
  readonly userKey: string;
  readonly routes: IRoutesConst;
  readonly imgSrc: string;
  levelsLoaded: boolean;
  categories$: Observable<ISubCategoryValue[]>;
  chosenLevel: seniorityEnum;
  userDetails$: Observable<IUserValues>;
  loading$: Observable<boolean>;
  roleLoading$: Observable<boolean>;
  adminRole: roleEnum;
  currentUser$: Subscription;
  currentUser: IBasicUser;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private store: Store<AuthModuleState | UsersModuleState>,
    private deleteDialogService: DialogService,
  ) {
    this.routes = ROUTES_PATH;
    this.levelsLoaded = false;
    this.chosenLevel = seniorityEnum.junior;
    this.userKey = this.route.snapshot.paramMap.get('key');
    this.store.dispatch(usersActions.loadOtherUserDetails({ userId: this.userKey }));
    this.store.dispatch(usersActions.loadSkillsWithTitles({ userId: this.userKey }));
    this.userDetails$ = this.store.select(selectOtherUserDetails);
    this.categories$ = this.store.select(selectOtherUserSkillProgress).pipe(tap((skills) => (this.levelsLoaded = skills !== null)));
    this.loading$ = this.store.select(selectSkillsLoading);
    this.currentUser$ = store
      .select(selectCurrentUser)
      .pipe(filter((user) => user !== null))
      .subscribe((user) => {
        this.currentUser = user;
        this.cdRef.markForCheck();
      });
    this.roleLoading$ = this.store.select(selectRoleLoading);
    this.imgSrc = 'assets/img/mock/profile_mock.jpg';
    this.adminRole = roleEnum.admin;
  }

  get ownerOrAdmin() {
    return this.userKey === this.currentUser.uid || this.currentUser.role === this.adminRole;
  }

  chooseLevel(level: seniorityEnum) {
    this.chosenLevel = level;
    this.cdRef.markForCheck();
  }

  showDeletePopup(id: string) {
    const isCurrent = this.currentUser.uid === id;
    const whose = isCurrent ? 'your' : 'this';
    this.deleteDialogService.showDialog(
      'Deleting user',
      `Are you sure that you want to delete ${whose} account?`,
      () => this.store.select(selectDeletingUser),
      () => {
        this.store.dispatch(deleteUser({ userId: id, isCurrent }));
      },
    );
  }

  setRole(userId: string, role: roleEnum) {
    const roleToSet = role === roleEnum.admin ? roleEnum.user : roleEnum.admin;
    this.store.dispatch(usersActions.updateRole({ userId, role: roleToSet }));
    this.store.dispatch(usersActions.loadOtherUserDetails({ userId }));
    if (userId === this.currentUser.uid) {
      this.store.dispatch(authActions.loadUserRefresh());
    }
  }

  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
}
