import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, storiesOf } from '@storybook/angular';

import { MaterialModule } from '@core/material';
import { seniorityEnum } from '@modules/skills';
import { LevelSelectComponent } from './level-select.component';

storiesOf('Level select', module)
  .addDecorator(moduleMetadata({ imports: [BrowserAnimationsModule, MaterialModule] }))
  .add('With junior', () => ({
    component: LevelSelectComponent,
    props: {
      selectedValue: seniorityEnum.junior,
    },
  }))
  .add('With middle', () => ({
    component: LevelSelectComponent,
    props: {
      selectedValue: seniorityEnum.middle,
    },
  }))
  .add('With senior', () => ({
    component: LevelSelectComponent,
    props: {
      selectedValue: seniorityEnum.senior,
    },
  }));
