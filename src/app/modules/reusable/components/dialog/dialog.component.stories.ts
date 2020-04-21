import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { of } from 'rxjs';

import { MaterialModule } from '@core/material';
import { DialogComponent } from '@modules/reusable';

const mockTemplate = '<app-dialog></app-dialog>';

storiesOf('Dialog', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, MaterialModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
    }),
  )
  .add('Waiting to user action light', () => ({
    moduleMetadata: {
      declarations: [DialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: '',
            caption: 'Are you sure about deleting your account?',
            classToApply: 'light',
            isCurrent: true,
          },
        },
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
            select: () => of(false),
          },
        },
      ],
    },
    template: mockTemplate,
  }))
  .add('Waiting to user action dark', () => ({
    moduleMetadata: {
      declarations: [DialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: '',
            caption: 'Are you sure about deleting your account?',
            classToApply: 'dark',
            isCurrent: true,
          },
        },
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
            select: () => of(false),
          },
        },
      ],
    },
    template: mockTemplate,
  }))
  .add('Loading light', () => ({
    moduleMetadata: {
      declarations: [DialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: '',
            caption: 'Are you sure about deleting your account?',
            classToApply: 'light',
            isCurrent: true,
          },
        },
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
            select: () => of(true),
          },
        },
      ],
    },
    template: mockTemplate,
  }))
  .add('Loading dark', () => ({
    moduleMetadata: {
      declarations: [DialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: '',
            caption: 'Are you sure about deleting your account?',
            classToApply: 'dark',
            isCurrent: true,
          },
        },
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
            select: () => of(true),
          },
        },
      ],
    },
    template: mockTemplate,
  }));
