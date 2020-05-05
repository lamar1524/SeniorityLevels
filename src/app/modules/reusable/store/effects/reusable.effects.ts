import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CommentsService, PopupService } from '../../services';
import * as reusableActions from '../../store/actions';

@Injectable()
export class ReusableEffects {
  constructor(private commentsService: CommentsService, private actions$: Actions, private popupService: PopupService) {}

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reusableActions.addComment),
      switchMap((action) =>
        this.commentsService.addComment(action.userId, action.catTitle, action.subCatTitle, action.comment, action.level).pipe(
          map(
            () => {
              this.popupService.success('Comment has been added successfully');
              return reusableActions.addCommentSuccess({ ...action });
            },
            catchError(() => {
              this.popupService.error('An error occurred while adding comment');
              return of(reusableActions.addCommentFail());
            }),
          ),
        ),
      ),
    ),
  );

  addCommentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reusableActions.addCommentSuccess),
      map((action) => reusableActions.loadComments({ ...action })),
    ),
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reusableActions.loadComments),
      switchMap((action) =>
        this.commentsService.getCommentsByData(action.userId, action.catTitle, action.subCatTitle, action.level).pipe(
          map((comments) => reusableActions.loadCommentsSuccess({ comments })),
          catchError((error) => {
            this.popupService.error('An error occurred while loading comments');
            return of(reusableActions.loadCommentsFail());
          }),
        ),
      ),
    ),
  );

  editComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reusableActions.editComment),
      switchMap((action) =>
        this.commentsService
          .editComment(action.commentId, action.content, action.userId, action.catTitle, action.subCatTitle, action.level)
          .pipe(
            map(
              () => reusableActions.editCommentSuccess({ ...action }),
              catchError(() => {
                this.popupService.error('An error occurred while editing comment');
                return of(reusableActions.editCommentFail());
              }),
            ),
          ),
      ),
    ),
  );

  editCommentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reusableActions.editCommentSuccess),
      map((action) => reusableActions.loadComments({ ...action })),
    ),
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reusableActions.deleteComment),
      switchMap((action) =>
        this.commentsService.deleteComment(action.commentId, action.userId, action.catTitle, action.subCatTitle, action.level).pipe(
          map(
            () => reusableActions.deleteCommentSuccess({ ...action }),
            catchError(() => {
              this.popupService.error('An error occurred while editing comment');
              return of(reusableActions.editCommentFail());
            }),
          ),
        ),
      ),
    ),
  );

  deleteCommentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reusableActions.deleteCommentSuccess),
      map((action) => reusableActions.loadComments({ ...action })),
    ),
  );
}
