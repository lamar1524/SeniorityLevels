import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { themeEnum } from '@shared/enum/theme.enum';
import { DataSharingService } from '@shared/services';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog, private dataSharingService: DataSharingService) {}

  showDialog(header: string, caption: string, select: () => Observable<any>, onAcceptCallback: () => void) {
    this.dataSharingService
      .getTheme()
      .pipe(first())
      .subscribe((theme) => {
        const classToApply = theme === themeEnum.light ? 'light' : 'dark';
        this.matDialog.open(DialogComponent, {
          width: '350px',
          height: '200px',
          data: {
            header,
            caption,
            classToApply,
            onAcceptCallback,
            select,
          },
          panelClass: 'u-dialog',
        });
      });
  }
}
