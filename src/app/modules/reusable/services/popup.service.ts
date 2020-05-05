import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PopupComponent } from '../components/popup/popup.component';
import { popupStateEnum } from '../enums/popup-state.enum';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private snackBar: MatSnackBar) {}

  showPopup(message: string, state: popupStateEnum) {
    this.snackBar.openFromComponent(PopupComponent, {
      duration: 3000,
      data: {
        text: message,
        type: state,
      },
      panelClass: ['mat-toolbar'],
    });
  }

  error = (message: string) => this.showPopup(message, popupStateEnum.error);

  info = (message: string) => this.showPopup(message, popupStateEnum.info);

  success = (message: string) => this.showPopup(message, popupStateEnum.success);
}
