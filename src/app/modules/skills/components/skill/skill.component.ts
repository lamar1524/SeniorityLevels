import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst, ISeniorityValues, ISubCategoryDescription } from '@core/interfaces';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import { PopupService } from '@modules/reusable';
import { SkillsModuleState } from '@modules/skills/store/reducers';
import { seniorityEnum } from '../../enums';
import { SlugTextifyPipe } from '../../pipes';
import * as skillsActions from '../../store/actions';
import { selectClickable, selectLevels, selectSkillsSubCategories } from '../../store/selectors';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SlugTextifyPipe],
})
export class SkillComponent implements OnDestroy {
  private catTitle: string;
  subCategories: ISubCategoryDescription[];
  private chosenSubCat: ISubCategoryDescription;
  private levels$: Subscription;
  private levels: ISeniorityValues;
  private currentlyDisplayedLevel: seniorityEnum;
  private clickable$: Observable<boolean>;
  private currentUser: User;
  private routes: IRoutesConst;
  private currentUser$: Subscription;
  private skillsDesc$: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private textifyPipe: SlugTextifyPipe,
    private popupService: PopupService,
    private authStore: Store<AuthModuleState>,
    private skillsStore: Store<SkillsModuleState>,
  ) {
    this.routes = ROUTES_PATH;
    this.currentlyDisplayedLevel = seniorityEnum.junior;
    this.clickable$ = this.skillsStore.pipe(select(selectClickable));
    this.activatedRoute.params.subscribe((params) => {
      this.catTitle = this.textifyPipe.transform(params.category);
      this.skillsStore.dispatch(skillsActions.loadSkillValuesByName({ categoryName: this.catTitle }));
      this.skillsDesc$ = this.skillsStore
        .pipe(select(selectSkillsSubCategories))
        .pipe(filter((res) => res !== null))
        .subscribe((res) => {
          this.subCategories = res.subCategories;
          this.chosenSubCat = this.subCategories[0];
          this.currentUser$ = this.authStore.pipe(select(selectCurrentUser)).subscribe(
            (user) => {
              this.currentUser = user;
              this.cdRef.markForCheck();
              this.skillsStore.dispatch(
                skillsActions.loadSkillsBySubCategory({
                  catTitle: this.catTitle,
                  subCatTitle: this.chosenSubCat.title,
                  userId: this.currentUser.uid,
                }),
              );
            },
            (error) => {
              this.popupService.error(error.message);
            },
          );
        });
    });
    this.levels$ = this.skillsStore.pipe(select(selectLevels)).subscribe((levels) => (this.levels = levels));
  }

  get contentLoaded() {
    return this.chosenSubCat !== undefined;
  }

  chooseSubCategory(subCat: ISubCategoryDescription, index: number) {
    this.document.querySelectorAll('.table__label').forEach((element) => {
      element.classList.remove('u-text--to-hover');
    });
    const chosenElement = this.document.querySelectorAll('.table__label')[index];
    if (chosenElement !== undefined) {
      chosenElement.classList.add('u-text--to-hover');
    }
    this.chosenSubCat = subCat;
  }

  sendSkill(level: seniorityEnum) {
    this.levels[level] = !this.levels[level];
    this.skillsStore.dispatch(
      skillsActions.sendSkillUpdate({
        catTitle: this.catTitle,
        subCatTitle: this.chosenSubCat.title,
        levels: this.levels,
        userId: this.currentUser.uid,
      }),
    );
  }

  chooseLevel(level: seniorityEnum) {
    this.currentlyDisplayedLevel = level;
    this.cdRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.currentUser$.unsubscribe();
    this.skillsDesc$.unsubscribe();
    this.levels$.unsubscribe();
  }
}
