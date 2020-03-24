import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PopupService } from '@modules/reusable/services/popup.service';

@Component({
  selector: 'app-error-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  private readonly message: string;

  constructor(private popupService: PopupService) {
    this.message = this.popupService.getPopupMessage();
  }
}
