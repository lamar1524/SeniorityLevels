import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CommentsService } from '../../services';
import * as reusableActions from '../../store/actions';

@Injectable()
export class ReusableEffects {
  constructor(private commentsService: CommentsService, private actions$: Actions) {}

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reusableActions.addComment),
      switchMap((action) =>
        this.commentsService.addComment(action.userId, action.catTitle, action.subCatTitle, action.comment).pipe(
          map(
            () => reusableActions.addCommentSuccess(),
            catchError(() => of(reusableActions.addCommentFail())),
          ),
        ),
      ),
    ),
  );
}
