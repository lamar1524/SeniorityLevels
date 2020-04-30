import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { IBasicUser } from '@core/interfaces';
import { AuthModuleState } from '@modules/authentication/store/reducers';
import { selectCurrentUser } from '@modules/authentication/store/selectors';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import * as reusableActions from '../../store/actions';
import { ReusableModuleState } from '../../store/reducers';
import { selectCommentFormLoading, selectFormVisibility } from '../../store/selectors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() catTitle: string;
  @Input() subCatTitle: string;
  @Input() description: string;
  @Input() level: string;
  @Input() userId: string;
  author: IBasicUser;
  formVisible$: Observable<boolean>;
  formLoading$: Subscription;
  commentForm: AppFormGroup;

  constructor(private store: Store<ReusableModuleState | AuthModuleState>) {
    this.commentForm = new AppFormGroup({
      content: new AppFormControl('', [Validators.required]),
    });
    this.formVisible$ = this.store.select(selectFormVisibility);
    this.formLoading$ = this.store.select(selectCommentFormLoading).subscribe((res) => {
      if (res === true) {
        this.commentForm.disable();
      } else {
        this.store.dispatch(reusableActions.toggleCommentForm());
        this.commentForm.enable();
      }
    });
    this.store.select(selectCurrentUser).subscribe((res) => {
      this.author = res;
    });
  }

  ngOnInit(): void {}

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
      comment: {
        author: this.author,
        content: this.content.value,
        dateCreated: new Date().toLocaleString('pl'),
      },
    };
    this.store.dispatch(reusableActions.addComment(data));
  }

  ngOnDestroy(): void {
    this.formLoading$.unsubscribe();
  }
}
