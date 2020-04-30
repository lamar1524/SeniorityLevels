import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { AppFormControl, AppFormGroup } from '@shared/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  @Input() description: string;
  @Input() level: string;
  formVisible: boolean;
  commentForm: AppFormGroup;

  constructor() {
    this.commentForm = new AppFormGroup({
      content: new AppFormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get content() {
    return this.commentForm.get('content');
  }

  formToggle() {
    this.formVisible = !this.formVisible;
  }
}
