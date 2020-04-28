import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { roleEnum } from '@core/enums/role.enum';
import { IBasicUser, IRoutesConst, ISubCategoryValue, IUserValues } from '@core/interfaces';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import { DialogService } from '@modules/reusable';
import { seniorityEnum } from '@modules/skills';
import * as usersActions from '../../store/actions';
import { UsersModuleState } from '../../store/reducers';
import { selectOtherUserDetails, selectOtherUserSkillProgress, selectSkillsLoading } from '../../store/selectors';

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
      });
    this.imgSrc = 'assets/img/mock/profile_mock.jpg';
    this.adminRole = roleEnum.admin;
  }

  chooseLevel(level: seniorityEnum) {
    this.chosenLevel = level;
    this.cdRef.markForCheck();
  }

  showDeletePopup(id: string) {
    if (this.currentUser.uid === id) {
      this.deleteDialogService.showDeleteDialog(id, 'Deleting user', true, 'Are you sure that you want to delete your account?');
    } else {
      this.deleteDialogService.showDeleteDialog(id, 'Deleting user', false, 'Are you sure that you want to delete this account?');
    }
  }

  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
}
