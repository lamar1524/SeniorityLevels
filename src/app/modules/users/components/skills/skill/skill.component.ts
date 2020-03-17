import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

import { ISeniorityLevels, ISubCategoryProgress } from '@core/interfaces';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent implements OnInit {
  @Input() subCategory: ISubCategoryProgress;
  @Input() catTitle: string;
  private tableVisibility: boolean;
  private levels: ISeniorityLevels;

  constructor(private cdRef: ChangeDetectorRef, private usersService: UsersService) {
    this.levels = {
      junior: false,
      middle: false,
      senior: false,
    };
  }

  ngOnInit(): void {
    this.tableVisibility = false;
    this.usersService.getCurrentUser().subscribe(
      (user) => {
        this.usersService.getSkillsBySubCategory(this.catTitle, this.subCategory.title, user.uid).subscribe((res: ISeniorityLevels) => {
          this.levels = res;
        });
      },
      (error) => {
        throwError(error);
      },
    );
  }

  tableToggle() {
    this.tableVisibility = !this.tableVisibility;
  }

  changeSkillLevel(level: string) {
    this.levels[level] = !this.levels[level];
    this.cdRef.markForCheck();
    // TODO discuss if sending data with every single change is reasonable
    this.setSkill();
  }

  setSkill() {
    this.usersService.getCurrentUser().subscribe((user) => {
      this.usersService.setUsersSkills(this.catTitle, this.subCategory.title, this.levels, user.uid).subscribe(
        () => {
          // TODO displaying popup window
        },
        (error) => {
          throwError(error);
        },
      );
    });
  }
}
