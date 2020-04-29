import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ICategoryProgress, ISubCategoryDescription } from '@core/interfaces';
import { SlugTextifyPipe } from '@modules/reusable/pipes';
import * as usersActions from '../../store/actions';
import { UsersModuleState } from '../../store/reducers';
import { selectSubCatsDesc, selectSubCatsLoading } from '../../store/selectors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SlugTextifyPipe],
})
export class CommentsComponent implements OnInit {
  category$: Observable<ICategoryProgress>;
  subCatsLoading$: Observable<boolean>;
  selectedSubCat: string;

  constructor(private store: Store<UsersModuleState>, private slugTextifyPipe: SlugTextifyPipe, private activatedRoute: ActivatedRoute) {
    const title = this.slugTextifyPipe.transform(this.activatedRoute.snapshot.paramMap.get('category'));
    this.store.dispatch(usersActions.loadSubCategoriesDesc({ title }));
    this.category$ = this.store.select(selectSubCatsDesc);
    this.subCatsLoading$ = this.store.select(selectSubCatsLoading);
  }

  ngOnInit(): void {}
}
