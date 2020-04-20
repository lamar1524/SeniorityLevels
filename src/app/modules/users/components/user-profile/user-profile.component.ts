import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { roleEnum } from '@core/enums/role.enum';
import { IBasicUser, IRoutesConst, ISubCategoryValue, IUserValues } from '@core/interfaces';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import { DialogComponent } from '@modules/reusable/components/dialog/dialog.component';
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
  levelsLoaded: boolean;
  categories$: Observable<ISubCategoryValue[]>;
  chosenLevel: seniorityEnum;
  userDetails$: Observable<IUserValues>;
  readonly imgSrc: string;
  loading$: Observable<boolean>;
  adminRole: roleEnum;
  currentUser$: Subscription;
  currentUser: IBasicUser;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private store: Store<AuthModuleState | UsersModuleState>,
    private dialog: MatDialog,
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
    this.dialog.open(DialogComponent, {
      width: '350px',
      height: '200px',
      data: {
        id,
        caption: 'Are you sure about deleting this account?',
      },
    });
  }

  ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
}
