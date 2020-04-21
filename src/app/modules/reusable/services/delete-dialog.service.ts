import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { themeEnum } from '@shared/enum/theme.enum';
import { DataSharingService } from '@shared/services';
import { DialogComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class DeleteDialogService {
  constructor(private matDialog: MatDialog, private dataSharingService: DataSharingService) {}

  showDialog(userId: string, isCurrent: boolean) {
    this.dataSharingService.getTheme().subscribe((theme) => {
      const classToApply = theme === themeEnum.light ? 'light' : 'dark';
      this.matDialog.open(DialogComponent, {
        width: '350px',
        height: '200px',
        data: {
          id: userId,
          caption: isCurrent ? 'Are you sure about deleting your account?' : 'Are you sure about deleting this account?',
          classToApply,
          isCurrent,
        },
        panelClass: 'u-dialog',
      });
    });
  }
}
