import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { ICategoryProgress, IRoutesConst, ISeniorityValues, ISubCategoryValue, IUser } from '@core/interfaces';
import { seniorityEnum } from '@modules/skills/enums/seniority.enum';
import { SkillsService } from '@modules/skills/services/skills.service';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  private readonly userKey: string;
  private readonly imgSrc: string;
  private readonly routes: IRoutesConst;
  private categories: ISubCategoryValue[];
  private chosenLevel: seniorityEnum;
  private levelsLoaded: boolean;
  private userDetails: IUser;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private skillsService: SkillsService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.routes = ROUTES_PATH;
    this.levelsLoaded = false;
    this.chosenLevel = seniorityEnum.junior;
    this.categories = [];
    this.userKey = this.route.snapshot.paramMap.get('key');
    this.usersService.getUserByKey(this.userKey).subscribe((details) => {
      this.userDetails = details;
      this.skillsService.getAllSkillsWithTitles(this.userKey).subscribe(
        (result) => {
          this.categories = this.skillsService.getSummaryProgress(result);
          this.levelsLoaded = true;
          this.cdRef.markForCheck();
        },
        (error) => {
          throwError(error);
        },
      );
    });
    this.imgSrc = 'assets/img/mock/profile_mock.jpg';
  }

  chooseLevel(level: seniorityEnum) {
    this.chosenLevel = level;
    this.cdRef.markForCheck();
  }

  get levelsFound() {
    return this.levelsLoaded && this.categories.length > 0;
  }
}
