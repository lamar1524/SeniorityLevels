import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst } from '@core/interfaces';
import { PopupService } from '@modules/reusable';
import { SkillsService } from '../../services';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  private data;
  private readonly routes: IRoutesConst;

  constructor(private skillsService: SkillsService, private popupService: PopupService) {
    this.routes = ROUTES_PATH;
    this.skillsService.getSkillsData().subscribe(
      (res) => {
        this.data = res;
      },
      (error) => {
        this.popupService.error(error.message);
      },
    );
  }

  get contentLoaded() {
    return this.data !== undefined;
  }
}
