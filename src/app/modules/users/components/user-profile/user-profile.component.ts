import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AppUser } from '@core/interfaces';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  userKey: string;
  userDetails: AppUser;
  goBackLink: string[];

  constructor(private route: ActivatedRoute, private usersService: UsersService, private cdRef: ChangeDetectorRef) {
    this.userKey = this.route.snapshot.paramMap.get('key');
    this.usersService.getUserByKey(this.userKey).subscribe((details) => {
      this.userDetails = {
        key: this.userKey,
        values: details,
      };
      this.cdRef.markForCheck();
    });
    this.goBackLink = [`/${ROUTES.home}/${ROUTES.users}/${ROUTES.usersList}`];
  }

  ngOnInit() {}
}
