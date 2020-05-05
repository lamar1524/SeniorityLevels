import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { roleEnum } from '@core/enums/role.enum';
import { IBasicUser, IComment } from '@core/interfaces';
import { AuthModuleState } from '@modules/authentication/store/reducers';
import { selectCurrentUser } from '@modules/authentication/store/selectors';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import * as reusableActions from '../../store/actions';
import { ReusableModuleState } from '../../store/reducers';
import { selectComments, selectCommentsLoading, selectCommentFormLoading, selectFormVisibility } from '../../store/selectors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnChanges, OnDestroy {
  @Input() catTitle: string;
  @Input() subCatTitle: string;
  @Input() description: string;
  @Input() level: string;
  @Input() userId: string;
  author: IBasicUser;
  formVisible$: Observable<boolean>;
  comments$: Observable<IComment[]>;
  commentsLoading$: Observable<boolean>;
  subscription: Subscription;
  commentForm: AppFormGroup;

  constructor(private store: Store<ReusableModuleState | AuthModuleState>, private router: Router) {
    this.commentForm = new AppFormGroup({
      content: new AppFormControl('', [Validators.required]),
    });
    this.formVisible$ = this.store.select(selectFormVisibility);
    const formLoading$ = this.store.select(selectCommentFormLoading).subscribe((res) => {
      if (res === true) {
        this.commentForm.disable();
      } else {
        this.commentForm.enable();
      }
    });
    this.subscription = new Subscription();
    this.subscription.add(formLoading$);
    this.comments$ = this.store.select(selectComments);
    this.commentsLoading$ = this.store.select(selectCommentsLoading);
  }

  ngOnChanges(changes: SimpleChanges) {
    const catTitle = changes.catTitle;
    const subCatTitle = changes.subCatTitle;
    const level = changes.level;
    this.store.dispatch(
      reusableActions.loadComments({
        userId: this.userId,
        catTitle: catTitle ? changes.catTitle.currentValue : this.catTitle,
        subCatTitle: subCatTitle ? changes.subCatTitle.currentValue : this.subCatTitle,
        level: level ? changes.level.currentValue : this.level,
      }),
    );

    const currentUser = this.store.select(selectCurrentUser).subscribe((res) => {
      this.author = res;
      if (!(this.userId === res.uid || res.role === roleEnum.admin)) {
        this.router.navigate([ROUTES_PATH.userList]);
      }
    });
    this.subscription.add(currentUser);
  }

  get content() {
    return this.commentForm.get('content');
  }

  formToggle() {
    this.store.dispatch(reusableActions.toggleCommentForm());
  }

  addComment() {
    const data = {
      userId: this.userId,
      catTitle: this.catTitle,
      subCatTitle: this.subCatTitle,
      level: this.level,
      comment: {
        author: this.author,
        content: this.content.value,
        dateCreated: new Date().toLocaleString('pl'),
      },
    };
    this.store.dispatch(reusableActions.addComment(data));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
