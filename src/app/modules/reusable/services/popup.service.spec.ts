import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { popupStateEnum } from '@modules/reusable';
import { PopupService } from './popup.service';

describe('PopupService', () => {
  let matSnackBar: MatSnackBar;
  let service: PopupService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: () => {},
          },
        },
      ],
    }),
  );
  beforeEach(() => {
    matSnackBar = TestBed.get(MatSnackBar);
    service = TestBed.get(PopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('methods', () => {
    it('showPopupMethod should call matSnackBar.openFromComponent', () => {
      spyOn(matSnackBar, 'openFromComponent');
      service.showPopup('', {} as popupStateEnum);
      expect(matSnackBar.openFromComponent).toHaveBeenCalled();
    });

    describe('concrete methods', () => {
      beforeEach(() => {
        spyOn(service, 'showPopup');
      });

      it('info method should call showPopupMethod', () => {
        service.info('');
        expect(service.showPopup).toHaveBeenCalledWith('', popupStateEnum.info);
      });

      it('error should call showPopupMethod', () => {
        service.error('');
        expect(service.showPopup).toHaveBeenCalledWith('', popupStateEnum.error);
      });

      it('success should call showPopupMethod', () => {
        service.success('');
        expect(service.showPopup).toHaveBeenCalledWith('', popupStateEnum.success);
      });
    });
  });
});
