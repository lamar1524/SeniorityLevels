import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProgressCategory, ISubCategoryProgress } from '@core/interfaces';

import { default as data } from './data';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  @Input() editable: boolean;
  data: IProgressCategory[];
  chosenCategories: ISubCategoryProgress[];
  private skillVisibility: boolean;

  constructor() {
    this.data = data;
    this.skillVisibility = false;
  }

  chooseCategory(categories: ISubCategoryProgress[]) {
    this.chosenCategories = categories;
    this.skillVisibility = true;
  }

  hideSkill() {
    this.skillVisibility = false;
  }
}
