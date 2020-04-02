import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
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
  private readonly userKey: string;
  private readonly routes: IRoutesConst;
  private categories$: Observable<ISubCategoryValue[]>;
  private chosenLevel: seniorityEnum;
  private readonly levelsLoaded: boolean;
  private userDetails$: Observable<IUserValues>;
  readonly imgSrc: string;
  private loading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private store: Store<UsersModuleState>) {
    this.routes = ROUTES_PATH;
    this.levelsLoaded = false;
    this.chosenLevel = seniorityEnum.junior;
    this.userKey = this.route.snapshot.paramMap.get('key');
    this.store.dispatch(usersActions.loadOtherUserDetails({ userId: this.userKey }));
    this.userDetails$ = this.store.pipe(select(selectOtherUserDetails));
    this.store.dispatch(usersActions.loadSkillsWithTitles({ userId: this.userKey }));
    this.categories$ = this.store.pipe(select(selectOtherUserSkillProgress));
    this.loading$ = this.store.pipe(select(selectSkillsLoading));
    this.imgSrc = 'assets/img/mock/profile_mock.jpg';
  }

  chooseLevel(level: seniorityEnum) {
    this.chosenLevel = level;
    this.cdRef.markForCheck();
  }

  get levelsFound() {
    return this.levelsLoaded;
  }
}
