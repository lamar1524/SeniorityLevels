import { ChangeDetectionStrategy, Component } from '@angular/core';
import { throwError } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst } from '@core/interfaces';
import { SkillsService } from '@modules/skills/services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  private data;
  private readonly routes: IRoutesConst;

  constructor(private skillsService: SkillsService) {
    this.routes = ROUTES_PATH;
    this.skillsService.getSkillsData().subscribe(
      (res) => {
        this.data = res;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  get contentLoaded() {
    return this.data !== undefined;
  }
}
