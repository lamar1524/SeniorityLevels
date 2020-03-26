import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DataSharingService } from '@shared/services';

@Component({
  selector: 'app-error-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  private readonly message: string;

  constructor(private dataSharingService: DataSharingService) {
    this.message = this.dataSharingService.getPopupMessage();
  }
}
