import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst } from '@core/interfaces';
import { PopupService } from '@modules/reusable/services/popup.service';
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

  constructor(private skillsService: SkillsService, private popupService: PopupService, private titleService: Title) {
    this.titleService.setTitle('Set up your skills');
    this.routes = ROUTES_PATH;
    this.skillsService.getSkillsData().subscribe(
      (res) => {
        this.data = res;
      },
      (error) => {
        this.popupService.showPopup(error.message);
      },
    );
  }

  get contentLoaded() {
    return this.data !== undefined;
  }
}
