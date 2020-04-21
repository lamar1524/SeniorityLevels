import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { deleteUser } from '@modules/users/store/actions';
import { UsersModuleState } from '@modules/users/store/reducers';
import { themeEnum } from '@shared/enum/theme.enum';
import { DataSharingService } from '@shared/services';
import { DialogComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog, private dataSharingService: DataSharingService, private store: Store<UsersModuleState>) {}

  showDeleteDialog(userId: string, header: string, isCurrent: boolean, caption: string) {
    this.dataSharingService.getTheme().subscribe((theme) => {
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
          onAcceptCallback: (id: string): void => {
            this.store.dispatch(deleteUser({ userId: id, isCurrent }));
          },
        },
        panelClass: 'u-dialog',
      });
    });
  }
}
