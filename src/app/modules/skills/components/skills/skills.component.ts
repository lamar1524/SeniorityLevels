import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { ICategoryProgress, IRoutesConst } from '@core/interfaces';
import * as skillsActions from '../../store/actions';
import { SkillsModuleState } from '../../store/reducers';
import { selectSkillsCategories } from '../../store/selectors';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  data$: Observable<ICategoryProgress[]>;
  readonly routes: IRoutesConst;

  constructor(private store: Store<SkillsModuleState>) {
    this.routes = ROUTES_PATH;
    this.store.dispatch(skillsActions.loadSkillsNames());
    this.data$ = this.store.select(selectSkillsCategories);
  }
}
