import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CATEGORIES_AMOUNT } from '@constants/skills.constants';
import { ICategoryProgress, ISeniorityValues, ISubCategoryValue, IUser } from '@core/interfaces';
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
  private userDetails: IUser;
  private categories: ISubCategoryValue[];
  private chosenLevel: seniorityEnum;
  private levelsLoaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private skillsService: SkillsService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.levelsLoaded = false;
    this.chosenLevel = seniorityEnum.junior;
    this.categories = [];
    this.userKey = this.route.snapshot.paramMap.get('key');
    this.usersService.getUserByKey(this.userKey).subscribe((details) => {
      this.userDetails = details;
      this.skillsService.getSkillsData().subscribe((data) => {
        this.computeUsersLevels(data, this.userDetails.key, this.categories);
      });
    });
    this.imgSrc = 'assets/img/mock/profile_mock.jpg';
  }

  computeUsersLevels(data: ICategoryProgress[], userId: string, arrayToPut: ISubCategoryValue[]) {
    data.forEach((element: ICategoryProgress) => {
      this.skillsService
        .getValuesBySkillNames(userId, element.title)
        .pipe(
          finalize(() => {
            this.levelsLoaded = true;
          }),
        )
        .subscribe(
          (values) => {
            if (values !== null) {
              const categoryValues: ISeniorityValues[] = Object.values(values);
              arrayToPut.push({
                title: element.title,
                levels: this.skillsService.getProgressOf(categoryValues, CATEGORIES_AMOUNT[element.title]),
              });
            }
            this.cdRef.markForCheck();
          },
          (error) => {
            throwError(error);
          },
        );
    });
  }

  chooseLevel(level: seniorityEnum) {
    this.chosenLevel = level;
    this.cdRef.markForCheck();
  }

  get levelsFound() {
    return this.levelsLoaded && this.categories.length > 0;
  }
}
