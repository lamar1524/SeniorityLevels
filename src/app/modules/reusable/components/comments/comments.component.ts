import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppFormControl, AppFormGroup } from '@shared/forms';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ROUTES_PATH } from '@constants/routes.constants';
import { roleEnum } from '@core/enums/role.enum';
import { IBasicUser, IComment } from '@core/interfaces';
import { AuthModuleState } from '@modules/authentication/store/reducers';
import { selectCurrentUser } from '@modules/authentication/store/selectors';
import { DialogService } from '../../services/dialog.service';
import * as reusableActions from '../../store/actions';
import { ReusableModuleState } from '../../store/reducers';
import {
  selectComments,
  selectCommentsLoading,
  selectCommentDeleting,
  selectCommentEditing,
  selectCommentFormLoading,
  selectFormVisibility,
} from '../../store/selectors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() catTitle: string;
  @Input() subCatTitle: string;
  @Input() description: string;
  @Input() level: string;
  @Input() userId: string;
  author: IBasicUser;
  formVisible$: Observable<boolean>;
  comments$: Observable<[string, IComment][]>;
  commentsLoading$: Observable<boolean>;
  subscription: Subscription;
  commentForm: AppFormGroup;
  editingComment: { [key: number]: boolean };
  readonly adminRole: roleEnum;
  readonly assets: string;

  constructor(private store: Store<ReusableModuleState | AuthModuleState>, private router: Router, private dialogService: DialogService) {
    this.assets = '../../../../../assets';
    this.adminRole = roleEnum.admin;
    this.subscription = new Subscription();
    this.initForms();
    this.initComments();
  }

  ngOnInit() {
    const currentUser = this.store
      .select(selectCurrentUser)
      .pipe(filter((res) => res !== null))
      .subscribe((res) => {
        this.author = res;
        if (!(this.userId === res.uid || res.role === roleEnum.admin)) {
          this.router.navigate([ROUTES_PATH.userList]);
        }
      });
    this.subscription.add(currentUser);
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
  }

  get content() {
    return this.commentForm.get('content');
  }

  initComments() {
    this.editingComment = {};
    this.comments$ = this.store.select(selectComments);
    this.commentsLoading$ = this.store.select(selectCommentsLoading);
  }

  initForms() {
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
    const toggleEditLoading$ = this.store.select(selectCommentEditing).subscribe((val) => {
      val ? this.commentForm.disable() : this.commentForm.enable();
    });
    this.subscription.add(toggleEditLoading$);
    this.subscription.add(formLoading$);
  }

  formToggle() {
    this.editingComment = {};
    this.content.setValue('');
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

  deleteComment(commentId: string) {
    this.dialogService.showDialog(
      'Do you want to delete comment?',
      'It can not be undone',
      () => this.store.select(selectCommentDeleting),
      () => {
        this.store.dispatch(
          reusableActions.deleteComment({
            commentId,
            userId: this.userId,
            catTitle: this.catTitle,
            subCatTitle: this.subCatTitle,
            level: this.level,
          }),
        );
      },
    );
  }

  showEditForm(id: number, content: string, value = true) {
    this.editingComment = {};
    this.content.setValue(content);
    this.editingComment[id] = value;
  }

  editComment(commentId: string) {
    this.editingComment = {};
    this.store.dispatch(
      reusableActions.editComment({
        commentId,
        catTitle: this.catTitle,
        subCatTitle: this.subCatTitle,
        level: this.level,
        userId: this.userId,
        content: this.content.value,
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
