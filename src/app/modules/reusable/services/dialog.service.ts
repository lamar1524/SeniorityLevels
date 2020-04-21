import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { deleteUser } from '@modules/users/store/actions';
import { UsersModuleState } from '@modules/users/store/reducers';
import { selectDeletingUser } from '@modules/users/store/selectors';
import { themeEnum } from '@shared/enum/theme.enum';
import { DataSharingService } from '@shared/services';
import { DialogComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog, private dataSharingService: DataSharingService) {}

  showDeleteDialog(userId: string, header: string, isCurrent: boolean, caption: string) {
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
            selector: selectDeletingUser,
          },
          panelClass: 'u-dialog',
        });
      });
  }
}
