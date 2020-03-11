import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_PATH } from '@constants/routes.constants';
import { RoutesConst } from '@core/interfaces';
import { AuthenticationService } from '@modules/authentication';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly routes: RoutesConst;

  constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthenticationService, private router: Router) {
    this.routes = ROUTES_PATH;
  }

  toggleNav(): void {
    this.document.querySelector('.hamburger__box').classList.toggle('hamburger__box--active');
    this.document.querySelector('.nav').classList.toggle('nav--active');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([ROUTES_PATH.home]);
  }
}
