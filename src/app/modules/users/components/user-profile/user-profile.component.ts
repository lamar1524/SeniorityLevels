import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { roleEnum } from '@core/enums/role.enum';
import { IRoutesConst, ISubCategoryValue, IUserValues } from '@core/interfaces';
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
export class UserProfileComponent {
  readonly userKey: string;
  readonly routes: IRoutesConst;
  levelsLoaded: boolean;
  categories$: Observable<ISubCategoryValue[]>;
  chosenLevel: seniorityEnum;
  userDetails$: Observable<IUserValues>;
  readonly imgSrc: string;
  loading$: Observable<boolean>;
  adminRole: roleEnum;

  constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private store: Store<UsersModuleState>) {
    this.routes = ROUTES_PATH;
    this.levelsLoaded = false;
    this.chosenLevel = seniorityEnum.junior;
    this.userKey = this.route.snapshot.paramMap.get('key');
    this.store.dispatch(usersActions.loadOtherUserDetails({ userId: this.userKey }));
    this.store.dispatch(usersActions.loadSkillsWithTitles({ userId: this.userKey }));
    this.userDetails$ = this.store.select(selectOtherUserDetails);
    this.categories$ = this.store.select(selectOtherUserSkillProgress).pipe(tap((skills) => (this.levelsLoaded = skills !== null)));
    this.loading$ = this.store.select(selectSkillsLoading);
    this.imgSrc = 'assets/img/mock/profile_mock.jpg';
    this.adminRole = roleEnum.admin;
  }

  chooseLevel(level: seniorityEnum) {
    this.chosenLevel = level;
    this.cdRef.markForCheck();
  }
}
