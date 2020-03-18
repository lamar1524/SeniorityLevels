import { ChangeDetectionStrategy, Component } from '@angular/core';

import { default as data } from './data';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  private readonly data;

  constructor() {
    this.data = data;
  }
}
