import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { throwError } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { ISeniorityValues, ISubCategoryDescription, RoutesConst } from '@core/interfaces';
import { SkillsService } from '@modules/skills/services/skills.service';
import { DataSharingService } from '@shared/services/data-sharing.service';
import { default as data } from '../skills/data';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent {
  private catTitle: string;
  private subCategories: ISubCategoryDescription[];
  private chosenSubCat: ISubCategoryDescription;
  private levels: ISeniorityValues;
  private currentlyDisplayedLevel: string;
  private clickable: boolean;
  private currentUser: User;
  private routes: RoutesConst;

  constructor(
    private cdRef: ChangeDetectorRef,
    private skillsService: SkillsService,
    private dataSharingService: DataSharingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.routes = ROUTES_PATH;
    this.currentUser = this.dataSharingService.getUser();
    this.currentlyDisplayedLevel = 'junior';
    this.clickable = true;
    this.activatedRoute.params.subscribe(
      (param) => {
        this.catTitle = param.category;
        const categoriesFiltered = data.filter((element) => element.title === this.catTitle);
        if (categoriesFiltered.length < 1) {
          throwError('Wrong category name');
        } else {
          this.subCategories = categoriesFiltered[0].subCategories;
          this.chooseSubCategory(this.subCategories[0], 0);
          this.cdRef.markForCheck();
        }
      },
      () => {
        this.router.navigate([ROUTES_PATH.skills]);
      },
    );
  }

  get contentLoaded() {
    return this.chosenSubCat !== undefined;
  }

  chooseSubCategory(subCat: ISubCategoryDescription, index: number) {
    this.document.querySelectorAll('.table__label').forEach((element) => {
      element.classList.remove('u-text--black');
    });
    this.skillsService.getSkillsBySubCategory(this.catTitle, subCat.title, this.currentUser.uid).subscribe(
      (res) => {
        this.levels = res;
        this.chosenSubCat = subCat;
        this.cdRef.markForCheck();
        this.document.querySelectorAll('.table__label')[index].classList.add('u-text--black');
      },
      (error) => {
        throwError(error);
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
    this.skillsService.setUsersSkills(this.catTitle, this.chosenSubCat.title, this.levels, this.currentUser.uid).subscribe(
      () => {
        this.clickable = true;
      },
      (error) => {
        this.clickable = false;
        throwError(error);
      },
    );
  }

  requirementsUp() {
    switch (this.currentlyDisplayedLevel) {
      case 'junior': {
        this.currentlyDisplayedLevel = 'middle';
        break;
      }

      case 'middle': {
        this.currentlyDisplayedLevel = 'senior';
        break;
      }

      case 'senior': {
        this.currentlyDisplayedLevel = 'junior';
        break;
      }

      default: {
        this.currentlyDisplayedLevel = 'junior';
        break;
      }
    }
    this.cdRef.markForCheck();
  }
}
