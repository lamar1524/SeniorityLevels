import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ISubCategoryProgress } from '@core/interfaces';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent implements OnInit {
  @Input() subCategory: ISubCategoryProgress;
  private tableVisibility: boolean;

  constructor() {}

  ngOnInit(): void {
    this.tableVisibility = false;
  }

  tableToggle() {
    this.tableVisibility = !this.tableVisibility;
  }
}
