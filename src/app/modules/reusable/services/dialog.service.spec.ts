import { TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';

import { themeEnum } from '@shared/enum/theme.enum';
import { DataSharingService } from '@shared/services';
import { DialogService } from './dialog.service';

describe('DeleteDialogService', () => {
  let service: DialogService;
  let dialog: SpyObj<MatDialog>;
  let dataSharingService: SpyObj<DataSharingService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialog,
          useValue: createSpyObj('matDialog', ['open']),
        },
        {
          provide: DataSharingService,
          useValue: createSpyObj('dataSharingService', ['getTheme']),
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            onAcceptCallback: (id: string) => {},
          },
        },
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
          },
        },
      ],
    });
    service = TestBed.inject(DialogService);
    dialog = TestBed.inject(MatDialog) as SpyObj<MatDialog>;
    dataSharingService = TestBed.inject(DataSharingService) as SpyObj<DataSharingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showPopup method', () => {
    it('should call .open method', () => {
      dataSharingService.getTheme.and.returnValue(of(themeEnum.light));
      service.showDeleteDialog('', '', true, '');
      expect(dialog.open).toHaveBeenCalled();
    });
  });
});
