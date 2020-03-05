import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  constructor(private authService: AuthenticationService, private router: Router, private cdRef: ChangeDetectorRef) {}

  logout = () => {
    this.authService.logout();
    this.router.navigate(['/']);
    this.cdRef.markForCheck();
  };
}
