import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { ICategoryProgress, ISubCategoryDescription } from '@core/interfaces';
import { SlugTextifyPipe } from '@modules/reusable/pipes';
import { seniorityEnum } from '@modules/skills';
import * as usersActions from '../../store/actions';
import { UsersModuleState } from '../../store/reducers';
import { selectSubCatsDesc, selectSubCatsLoading } from '../../store/selectors';

@Component({
  selector: 'app-comments-category-choose',
  templateUrl: './comments-category-choose.component.html',
  styleUrls: ['./comments-category-choose.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SlugTextifyPipe],
})
export class CommentsCategoryChooseComponent implements OnDestroy {
  private category$: Subscription;
  category: ICategoryProgress;
  subCatsLoading$: Observable<boolean>;
  chosenSubCat: ISubCategoryDescription;
  chosenLevel: seniorityEnum;

  constructor(
    private store: Store<UsersModuleState>,
    private slugTextifyPipe: SlugTextifyPipe,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {
    const title = this.slugTextifyPipe.transform(this.activatedRoute.snapshot.paramMap.get('category'));
    this.store.dispatch(usersActions.loadSubCategoriesDesc({ title }));
    this.subCatsLoading$ = this.store.select(selectSubCatsLoading);
    this.category$ = this.store.select(selectSubCatsDesc).subscribe((category) => {
      this.category = category;
      this.chosenSubCat = category.subCategories[0];
      this.cdRef.markForCheck();
    });
    this.chosenLevel = seniorityEnum.junior;
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
  }

  changeDescriptions() {}

  chooseLevel(level: seniorityEnum) {
    this.chosenLevel = level;
  }
}
