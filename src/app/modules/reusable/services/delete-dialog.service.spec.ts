import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';

import { themeEnum } from '@shared/enum/theme.enum';
import { DataSharingService } from '@shared/services';
import { DialogComponent } from '../components';
import { DeleteDialogService } from './delete-dialog.service';

describe('DeleteDialogService', () => {
  let service: DeleteDialogService;
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
      ],
    });
    service = TestBed.inject(DeleteDialogService);
    dialog = TestBed.inject(MatDialog) as SpyObj<MatDialog>;
    dataSharingService = TestBed.inject(DataSharingService) as SpyObj<DataSharingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showPopup method', () => {
    it('should call .open method', () => {
      const assertConfig = {
        width: '350px',
        height: '200px',
        data: {
          id: '',
          caption: 'Are you sure about deleting your account?',
          classToApply: 'light',
          isCurrent: true,
        },
        panelClass: 'u-dialog',
      };
      dataSharingService.getTheme.and.returnValue(of(themeEnum.light));
      service.showDialog('', true);
      expect(dialog.open).toHaveBeenCalledWith(DialogComponent, assertConfig);
    });
  });
});
