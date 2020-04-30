import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppFormControl, AppFormGroup } from '@shared/forms';
import * as reusableActions from '../../store/actions';
import { ReusableModuleState } from '../../store/reducers';
import { selectFormVisibility } from '../../store/selectors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  @Input() description: string;
  @Input() level: string;
  formVisible$: Observable<boolean>;
  commentForm: AppFormGroup;

  constructor(private store: Store<ReusableModuleState>) {
    this.commentForm = new AppFormGroup({
      content: new AppFormControl('', Validators.required),
    });
    this.formVisible$ = this.store.select(selectFormVisibility);
  }

  ngOnInit(): void {}

  get content() {
    return this.commentForm.get('content');
  }

  formToggle() {
    this.store.dispatch(reusableActions.toggleCommentForm());
  }
}
