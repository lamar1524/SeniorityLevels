import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IBasicUser, ICategoryProgress, IRoutesConst, ISeniorityValues, ISubCategoryDescription } from '@core/interfaces';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import { SlugTextifyPipe } from '../../../reusable/pipes';
import { seniorityEnum } from '../../enums';
import * as skillsActions from '../../store/actions';
import { SkillsModuleState } from '../../store/reducers';
import { selectClickable, selectLevels, selectSkillsSubCategories } from '../../store/selectors';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SlugTextifyPipe],
})
export class SkillComponent implements OnDestroy {
  private subscription: Subscription;
  catTitle: string;
  subCategories: ISubCategoryDescription[];
  chosenSubCat: ISubCategoryDescription;
  levels: ISeniorityValues;
  currentlyDisplayedLevel: seniorityEnum;
  clickable$: Observable<boolean>;
  currentUser: IBasicUser;
  routes: IRoutesConst;
  public: boolean;

  constructor(
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private textifyPipe: SlugTextifyPipe,
    private store: Store<AuthModuleState | SkillsModuleState>,
  ) {
    this.public = true;
    this.subscription = new Subscription();
    this.routes = ROUTES_PATH;
    this.currentlyDisplayedLevel = seniorityEnum.junior;
    this.clickable$ = this.store.select(selectClickable);
    this.activatedRoute.params.subscribe((params) => {
      this.routeChangeHandler(params);
    });
    const levels$: Subscription = this.store.select(selectLevels).subscribe((levels) => (this.levels = { ...levels }));
    this.subscription.add(levels$);
  }

  get contentLoaded() {
    return this.chosenSubCat !== undefined;
  }

  routeChangeHandler(params) {
    this.catTitle = this.textifyPipe.transform(params.category);
    this.store.dispatch(skillsActions.loadSkillValuesByName({ categoryName: this.catTitle }));
    const skillsDesc$: Subscription = this.store
      .select(selectSkillsSubCategories)
      .pipe(filter((res) => res !== null))
      .subscribe((res: ICategoryProgress) => {
        this.loadSubCategoriesHandler(res, this.catTitle);
      });
    this.subscription.add(skillsDesc$);
  }

  loadSubCategoriesHandler(categories: ICategoryProgress, catTitle: string) {
    this.subCategories = categories.subCategories;
    this.chosenSubCat = this.subCategories[0];
    const currentUser$: Subscription = this.store
      .select(selectCurrentUser)
      .pipe(filter((user) => user !== null))
      .subscribe((user: IBasicUser) => {
        this.loadUserHandler(user, catTitle, categories.subCategories[0].title);
      });
    this.subscription.add(currentUser$);
  }

  loadUserHandler(user: IBasicUser, catTitle: string, subCatTitle: string) {
    this.currentUser = user;
    this.cdRef.markForCheck();
    this.store.dispatch(
      skillsActions.loadSkillsBySubCategory({
        catTitle,
        subCatTitle,
        userId: user.uid,
      }),
    );
  }

  chooseSubCategory(subCat: ISubCategoryDescription, index: number, catTitle: string, subCatTitle: string, userId: string) {
    this.document.querySelectorAll('.table__label').forEach((element) => {
      element.classList.remove('u-text--to-hover');
    });
    const chosenElement = this.document.querySelectorAll('.table__label')[index];
    if (chosenElement !== undefined) {
      chosenElement.classList.add('u-text--to-hover');
    }
    this.chosenSubCat = subCat;
    this.store.dispatch(
      skillsActions.loadSkillsBySubCategory({
        catTitle,
        subCatTitle,
        userId,
      }),
    );
    this.cdRef.markForCheck();
  }

  sendSkill(level: seniorityEnum, catTitle: string, subCatTitle: string, levels: ISeniorityValues, userId: string) {
    levels[level] = !levels[level];
    this.levels = { ...levels };
    this.cdRef.markForCheck();
    this.store.dispatch(
      skillsActions.sendSkillUpdate({
        catTitle,
        subCatTitle,
        levels,
        userId,
      }),
    );
  }

  chooseLevel(level: seniorityEnum) {
    this.currentlyDisplayedLevel = level;
    this.cdRef.markForCheck();
  }

  showPublic(value: boolean) {
    this.public = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
