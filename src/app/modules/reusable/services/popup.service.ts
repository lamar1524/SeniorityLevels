import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { DataSharingService } from '@shared/services';
import { PopupComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private snackBar: MatSnackBar, private dataSharingService: DataSharingService) {}

  showPopup(message: string) {
    this.snackBar.openFromComponent(PopupComponent, {
      duration: 3000,
      data: message,
    });
  }
}
