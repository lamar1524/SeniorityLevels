import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, storiesOf } from '@storybook/angular';

import { MaterialModule } from '@core/material';
import { popupStateEnum } from '@modules/reusable';
import { PopupComponent } from './popup.component';

const templateString = `<div class="mat-toolbar" style="
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
    margin: 24px;
    max-width: 33vw;
    min-width: 344px;
    padding: 14px 16px;
    min-height: 48px;
    transform-origin: center;
    background: #323232;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);">
    <app-popup></app-popup>
    </div>`;

storiesOf('Popup', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, MaterialModule],
    }),
  )
  .add('Error', () => ({
    moduleMetadata: {
      declarations: [PopupComponent],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {
            text: 'Sample error',
            type: popupStateEnum.error,
          },
        },
      ],
    },
    template: templateString,
  }))
  .add('Info', () => ({
    moduleMetadata: {
      declarations: [PopupComponent],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {
            text: 'Sample info',
            type: popupStateEnum.info,
          },
        },
      ],
    },
    template: templateString,
  }))
  .add('Success', () => ({
    moduleMetadata: {
      declarations: [PopupComponent],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {
            text: 'Sample success',
            type: popupStateEnum.success,
          },
        },
      ],
    },
    template: templateString,
  }));
