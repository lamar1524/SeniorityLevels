import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { PopupComponent } from '../components';
import { popupStateEnum } from '../enums';

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
    });
  }

  error = (message: string) => this.showPopup(message, popupStateEnum.error);

  info = (message: string) => this.showPopup(message, popupStateEnum.info);

  success = (message: string) => this.showPopup(message, popupStateEnum.success);
}
