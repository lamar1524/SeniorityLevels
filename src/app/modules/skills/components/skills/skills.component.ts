import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTES_PATH } from '@constants/routes.constants';
import { RoutesConst } from '@core/interfaces';

import { default as data } from './data';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  private readonly data;
  private readonly routes: RoutesConst;

  constructor() {
    this.routes = ROUTES_PATH;
    this.data = data;
  }
}
