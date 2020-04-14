import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { popupStateEnum } from '../../enums';

@Component({
  selector: 'app-error-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  classObj;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.classObj = {
      'text--red': this.data.type === popupStateEnum.error,
      'text--white': this.data.type === popupStateEnum.info,
      'text--green': this.data.type === popupStateEnum.success,
    };
  }
}
