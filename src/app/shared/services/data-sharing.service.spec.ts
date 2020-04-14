import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { themeEnum } from '../enum/theme.enum';
import { DataSharingService } from './data-sharing.service';

describe('DataSharingService', () => {
  let service: DataSharingService;
  const themeKey = 'Theme';

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.inject(DataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTheme method', () => {
    it('should return observable', () => {
      expect(service.getTheme() instanceof Observable).toBeTruthy();
    });
  });

  describe('setTheme method', () => {
    it('should call setThemeInStorage method', () => {
      spyOn(service, 'setThemeInStorage');
      service.setTheme(themeEnum.light);
      expect(service.setThemeInStorage).toHaveBeenCalledWith(themeEnum.light);
    });
  });

  describe('getThemeFromStorage method', () => {
    it('should call getItem method', () => {
      spyOn(localStorage, 'getItem');
      service.getThemeFromStorage();
      expect(localStorage.getItem).toHaveBeenCalledWith(themeKey);
    });
  });

  describe('toggleTheme method', () => {
    it('should call setTheme method', () => {
      spyOn(service, 'setTheme');
      service.toggleTheme();
      expect(service.setTheme).toHaveBeenCalled();
    });
  });
});
