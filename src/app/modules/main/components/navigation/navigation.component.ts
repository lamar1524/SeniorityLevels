import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_PATH } from '@constants/routes.constants';
import { roleEnum } from '@core/enums/role.enum';
import { IBasicUser, IRoutesConst } from '@core/interfaces';
import { AuthenticationService } from '@modules/authentication';
import { selectCurrentUser, AuthModuleState } from '@modules/authentication/store';
import { badgeSizeEnum } from '@modules/reusable';
import { Store } from '@ngrx/store';
import { DataSharingService } from '@shared/services';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly routes: IRoutesConst;
  currentUser$: Observable<IBasicUser>;
  readonly adminRole: roleEnum.admin;
  readonly size: badgeSizeEnum;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthenticationService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private store: Store<AuthModuleState>,
  ) {
    this.routes = ROUTES_PATH;
    this.currentUser$ = this.store.select(selectCurrentUser).pipe(filter((res) => res !== null));
    this.adminRole = roleEnum.admin;
    this.size = badgeSizeEnum.big;
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
