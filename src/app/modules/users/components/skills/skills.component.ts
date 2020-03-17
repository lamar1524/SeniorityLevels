import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoryProgress } from '@core/interfaces';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  @Input() categoryData: ICategoryProgress;
  @Input() categoryName: string;
  @Output() hide = new EventEmitter();

  constructor() {}

  hideComponent(event) {
    event.preventDefault();
    this.hide.emit();
  }
}
