import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { PopupComponent } from '@modules/reusable/components';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupMessage: string;

  constructor(private snacBar: MatSnackBar) {}

  getPopupMessage(): string {
    return this.popupMessage;
  }

  setPopupMessage(message: string): void {
    this.popupMessage = message;
  }

  showPopup(message: string) {
    this.setPopupMessage(message);
    this.snacBar.openFromComponent(PopupComponent, {
      duration: 3000,
    });
  }
}
