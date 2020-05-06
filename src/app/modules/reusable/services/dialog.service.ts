import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { deleteUser } from '@modules/users/store/actions';
import { UsersModuleState } from '@modules/users/store/reducers';
import { selectDeletingUser } from '@modules/users/store/selectors';
import { themeEnum } from '@shared/enum/theme.enum';
import { DataSharingService } from '@shared/services';
import { DialogComponent } from '../components/dialog/dialog.component';
import { deleteComment } from '../store/actions/comments.actions';
import { selectCommentDeleting } from '../store/selectors/comments.selectors';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog, private dataSharingService: DataSharingService) {}

  showDeleteUserDialog(userId: string, header: string, isCurrent: boolean, caption: string) {
    this.dataSharingService
      .getTheme()
      .pipe(first())
      .subscribe((theme) => {
        const classToApply = theme === themeEnum.light ? 'light' : 'dark';
        this.matDialog.open(DialogComponent, {
          width: '350px',
          height: '200px',
          data: {
            id: userId,
            header,
            caption,
            classToApply,
            isCurrent,
            onAcceptCallback: (store: Store<UsersModuleState>, id: string): void => {
              store.dispatch(deleteUser({ userId: id, isCurrent }));
            },
            select: selectDeletingUser,
          },
          panelClass: 'u-dialog',
        });
      });
  }

  showDeleteCommentUserDialog(
    commentId: string,
    userId: string,
    catTitle: string,
    subCatTitle: string,
    level: string,
    header: string,
    caption: string,
  ) {
    this.dataSharingService
      .getTheme()
      .pipe(first())
      .subscribe((theme) => {
        const classToApply = theme === themeEnum.light ? 'light' : 'dark';
        this.matDialog.open(DialogComponent, {
          width: '350px',
          height: '200px',
          data: {
            id: commentId,
            header,
            caption,
            classToApply,
            onAcceptCallback: (store: Store<any>): void => {
              store.dispatch(deleteComment({ commentId, userId, catTitle, subCatTitle, level }));
            },
            select: selectCommentDeleting,
          },
          panelClass: 'u-dialog',
        });
      });
  }
}
