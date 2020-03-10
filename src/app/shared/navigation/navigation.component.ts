import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_PATH } from '@constants/routes.constants';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { RoutesConst } from '@core/interfaces';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly routes: RoutesConst;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.routes = ROUTES_PATH;
  }

  toggleNav(): void {
    document.querySelector('.hamburger__box').classList.toggle('hamburger__box--active');
    document.querySelector('.nav').classList.toggle('nav--active');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([ROUTES_PATH.home]);
  }
}
