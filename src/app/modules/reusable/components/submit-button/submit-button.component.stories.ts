import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, storiesOf } from '@storybook/angular';

import { SubmitButtonComponent } from './submit-button.component';

import { MaterialModule } from '@core/material';

storiesOf('Submit button', module)
  .addDecorator(moduleMetadata({ imports: [BrowserAnimationsModule, MaterialModule] }))
  .add('Loading', () => ({
    component: SubmitButtonComponent,
    props: {
      loading: true,
      disabled: true,
    },
  }))
  .add('Ready', () => ({
    moduleMetadata: {
      declarations: [SubmitButtonComponent],
    },
    template: `<app-submit-button [disabled]="false" [loading]="false">Submit</app-submit-button>`,
  }))
  .add('Disabled', () => ({
    moduleMetadata: {
      declarations: [SubmitButtonComponent],
    },
    template: `<app-submit-button [disabled]="true" [loading]="false">Submit</app-submit-button>`,
  }));
