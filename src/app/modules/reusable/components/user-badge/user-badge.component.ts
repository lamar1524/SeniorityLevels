import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { roleEnum } from '@core/enums/role.enum';
import { IBadgeClassObj } from '@core/interfaces/class-obj.interface';
import { badgeSizeEnum } from '../../enums';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBadgeComponent implements OnInit {
  @Input() role: roleEnum;
  @Input() size: badgeSizeEnum;
  readonly adminRole: roleEnum;
  readonly userRole: roleEnum;
  classObj: IBadgeClassObj;

  constructor() {
    this.adminRole = roleEnum.admin;
    this.userRole = roleEnum.user;
  }

  ngOnInit(): void {
    switch (this.size) {
      case badgeSizeEnum.big: {
        this.classObj = { small: false, big: true };
        break;
      }
      case badgeSizeEnum.small: {
        this.classObj = { small: true, big: false };
        break;
      }
      default: {
        this.classObj = { small: true, big: false };
      }
    }
  }
}
