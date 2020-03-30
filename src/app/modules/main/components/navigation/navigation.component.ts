import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_PATH } from '@constants/routes.constants';
import { IRoutesConst } from '@core/interfaces';
import { AuthenticationService } from '@modules/authentication';
import { DataSharingService } from '@shared/services';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly routes: IRoutesConst;
  currentUser$: Observable<User>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthenticationService,
    private router: Router,
    private dataSharingService: DataSharingService,
  ) {
    this.routes = ROUTES_PATH;
    this.currentUser$ = this.dataSharingService.getUser();
  }

  toggleNav(): void {
    this.document.querySelector('.hamburger__box').classList.toggle('hamburger__box--active');
    this.document.querySelector('.nav').classList.toggle('nav--active');
  }

  closeNav(): void {
    this.document.querySelector('.hamburger__box').classList.remove('hamburger__box--active');
    this.document.querySelector('.nav').classList.remove('nav--active');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([ROUTES_PATH.home]);
  }

  toggleTheme = () => this.dataSharingService.toggleTheme();
}
