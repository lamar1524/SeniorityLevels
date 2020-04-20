import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUiModule } from '@modules/reusable';
import { Store } from '@ngrx/store';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { ROUTES_PATH } from '@constants/routes.constants';
import { AuthenticationService } from '@modules/authentication';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [RouterTestingModule, MockModule(SharedUiModule)],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            logout: () => {},
          },
        },
        {
          provide: Store,
          useValue: { select: () => of({}) },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleNav method', () => {
    it('should call proper methods', () => {
      spyOn(document, 'querySelector').and.returnValue({ classList: { toggle: () => {} } as any } as Element);
      spyOn(document.querySelector('foo').classList, 'toggle');
      component.toggleNav();
      expect(document.querySelector).toHaveBeenCalledWith('.hamburger__box');
      expect(document.querySelector).toHaveBeenCalledWith('.nav');
      expect(document.querySelector('foo').classList.toggle).toHaveBeenCalledWith('hamburger__box--active');
      expect(document.querySelector('foo').classList.toggle).toHaveBeenCalledWith('nav--active');
    });
  });

  describe('closeNav method', () => {
    it('should call proper methods', () => {
      spyOn(document, 'querySelector').and.returnValue({ classList: { remove: () => {} } as any } as Element);
      spyOn(document.querySelector('foo').classList, 'remove');
      component.closeNav();
      expect(document.querySelector).toHaveBeenCalledWith('.hamburger__box');
      expect(document.querySelector).toHaveBeenCalledWith('.nav');
      expect(document.querySelector('foo').classList.remove).toHaveBeenCalledWith('hamburger__box--active');
      expect(document.querySelector('foo').classList.remove).toHaveBeenCalledWith('nav--active');
    });
  });

  describe('logout method', () => {
    beforeEach(() => {
      spyOn(router, 'navigate');
    });

    it('should call logout method', () => {
      spyOn(authService, 'logout');
      component.logout();
      expect(authService.logout).toHaveBeenCalled();
    });

    it('should navigate properly', () => {
      component.logout();
      expect(router.navigate).toHaveBeenCalledWith([ROUTES_PATH.home]);
    });
  });
});
