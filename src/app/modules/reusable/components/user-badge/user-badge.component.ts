import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { roleEnum } from '@core/enums/role.enum';
import { badgeSizeEnum } from '@modules/reusable/enums/user-badge.enum';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBadgeComponent implements OnInit {
  @Input() role: roleEnum;
  @Input() size: badgeSizeEnum;
  classObj;

  constructor() {}

  ngOnInit(): void {
    switch (this.size) {
      case badgeSizeEnum.big: {
        this.classObj = { big: true };
        break;
      }
      case badgeSizeEnum.small: {
        this.classObj = { small: true };
        break;
      }
      default: {
        this.classObj = { small: true };
      }
    }
  }
}
