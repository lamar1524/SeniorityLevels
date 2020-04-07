import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst, ISubCategoryValue, IUserValues } from '@core/interfaces';
import { seniorityEnum } from '@modules/skills';
import { tap } from 'rxjs/operators';
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
  private readonly routes: IRoutesConst;
  private categories$: Observable<ISubCategoryValue[]>;
  private chosenLevel: seniorityEnum;
  private levelsLoaded: boolean;
  private userDetails$: Observable<IUserValues>;
  readonly imgSrc: string;
  private loading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private store: Store<UsersModuleState>) {
    this.routes = ROUTES_PATH;
    this.levelsLoaded = false;
    this.chosenLevel = seniorityEnum.junior;
    this.userKey = this.route.snapshot.paramMap.get('key');
    this.store.dispatch(usersActions.loadOtherUserDetails({ userId: this.userKey }));
    this.store.dispatch(usersActions.loadSkillsWithTitles({ userId: this.userKey }));
    this.userDetails$ = this.store.select(selectOtherUserDetails);
    this.categories$ = this.store.select(selectOtherUserSkillProgress).pipe(
      tap((skills) => skills === null ? this.levelsLoaded = false : this.levelsLoaded = true)
    );
    this.loading$ = this.store.select(selectSkillsLoading);
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
