import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ISubCategoryProgress } from '@core/interfaces';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent implements OnInit {
  @Input() categoryData: ISubCategoryProgress[];
  @Output() hide = new EventEmitter();
  private listVisible: boolean[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.categoryData);
    this.listVisible = [];
    this.listVisible.fill(true, 0, this.categoryData.length);
  }

  isVisible = (index: number): boolean => this.listVisible[index];

  showList(index: number) {
    this.listVisible.fill(false);
    this.listVisible[index] = true;
  }

  hideComponent(event) {
    event.preventDefault();
    this.hide.emit();
  }
}
