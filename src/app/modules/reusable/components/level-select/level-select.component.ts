import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { seniorityEnum } from '@modules/skills/enums/seniority.enum';

@Component({
  selector: 'app-level-select',
  templateUrl: './level-select.component.html',
  styleUrls: ['./level-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelSelectComponent {
  @Output() chooseLevel: EventEmitter<seniorityEnum>;
  options: seniorityEnum[];
  selectedValue: seniorityEnum;

  constructor() {
    this.chooseLevel = new EventEmitter<seniorityEnum>();
    this.options = [seniorityEnum.junior, seniorityEnum.middle, seniorityEnum.senior];
    this.selectedValue = seniorityEnum.junior;
  }
}
