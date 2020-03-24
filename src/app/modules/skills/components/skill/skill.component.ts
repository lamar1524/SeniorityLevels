import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { filter, finalize } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst, ISeniorityValues, ISubCategoryDescription } from '@core/interfaces';
import { PopupService } from '@modules/reusable/services/popup.service';
import { seniorityEnum } from '@modules/skills/enums/seniority.enum';
import { SlugTextifyPipe } from '@modules/skills/pipes/slug-textify';
import { SkillsService } from '@modules/skills/services/skills.service';
import { DataSharingService } from '@shared/services/data-sharing.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SlugTextifyPipe],
})
export class SkillComponent {
  private catTitle: string;
  private subCategories: ISubCategoryDescription[];
  private chosenSubCat: ISubCategoryDescription;
  private levels: ISeniorityValues;
  private currentlyDisplayedLevel: seniorityEnum;
  private clickable: boolean;
  private currentUser: User;
  private routes: IRoutesConst;

  constructor(
    private cdRef: ChangeDetectorRef,
    private skillsService: SkillsService,
    private dataSharingService: DataSharingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private textifyPipe: SlugTextifyPipe,
    private popupService: PopupService,
  ) {
    this.activatedRoute.params.subscribe(
      (param) => {
        this.catTitle = this.textifyPipe.transform(param.category);
        this.skillsService.getSkillsData().subscribe(
          (data) => {
            const categoriesFiltered = data.filter((element) => element.title === this.catTitle);
            if (categoriesFiltered.length < 1) {
              this.popupService.showPopup('Wrong route path!');
              this.router.navigate([ROUTES_PATH.skills]);
            } else {
              this.subCategories = categoriesFiltered[0].subCategories;
              this.setInitialValues();
              this.cdRef.markForCheck();
            }
          },
          (error) => {
            this.popupService.showPopup(error.message);
          },
        );
      },
      (error) => {
        this.popupService.showPopup(error.message);
        this.router.navigate([ROUTES_PATH.skills]);
      },
    );
  }

  get contentLoaded() {
    return this.chosenSubCat !== undefined;
  }

  setInitialValues() {
    this.routes = ROUTES_PATH;
    this.currentlyDisplayedLevel = seniorityEnum.junior;
    this.clickable = true;
    this.dataSharingService
      .getUser()
      .pipe(filter((user) => user !== null))
      .subscribe(
        (user) => {
          this.currentUser = user;
          this.cdRef.markForCheck();
          this.chooseSubCategory(this.subCategories[0], 0);
        },
        (error) => {
          this.popupService.showPopup(error.message);
        },
      );
  }

  chooseSubCategory(subCat: ISubCategoryDescription, index: number) {
    this.document.querySelectorAll('.table__label').forEach((element) => {
      element.classList.remove('u-text--black');
    });
    this.clickable = false;
    this.skillsService
      .getSkillsBySubCategory(this.catTitle, subCat.title, this.currentUser.uid)
      .pipe(finalize(() => (this.clickable = true)))
      .subscribe(
        (res) => {
          this.levels = res;
          this.chosenSubCat = subCat;
          this.cdRef.markForCheck();
          const element = this.document.querySelectorAll('.table__label')[index];
          if (element !== undefined) {
            element.classList.add('u-text--black');
          }
        },
        (error) => {
          this.popupService.showPopup(error.message);
        },
      );
  }

  setSkill(level: string) {
    if (this.clickable) {
      this.levels[level] = !this.levels[level];
      this.cdRef.markForCheck();
      this.sendSkill();
    }
  }

  sendSkill() {
    this.clickable = false;
    this.skillsService
      .setUsersSkills(this.catTitle, this.chosenSubCat.title, this.levels, this.currentUser.uid)
      .pipe(
        finalize(() => {
          this.clickable = true;
          this.cdRef.markForCheck();
        }),
      )
      .subscribe(
        () => {},
        (error) => {
          this.popupService.showPopup(error.message);
        },
      );
  }

  chooseLevel(level: seniorityEnum) {
    this.currentlyDisplayedLevel = level;
    this.cdRef.markForCheck();
  }
}
