import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { PopupComponent } from '@modules/reusable';
import { DataSharingService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class PopupService {

  constructor(private snackBar: MatSnackBar, private dataSharingService: DataSharingService) {}

  showPopup(message: string) {
    this.dataSharingService.setPopupMessage(message);
    this.snackBar.openFromComponent(PopupComponent, {
      duration: 3000,
    });
  }
}
