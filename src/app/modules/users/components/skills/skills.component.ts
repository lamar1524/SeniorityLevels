import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ISubCategoryProgress } from '@core/interfaces';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  @Input() categoryData: ISubCategoryProgress[];
  @Output() hide = new EventEmitter();

  constructor() {}

  hideComponent(event) {
    event.preventDefault();
    this.hide.emit();
  }
}
