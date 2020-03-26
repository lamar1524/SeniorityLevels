import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material';
import { LevelSelectComponent, PopupComponent, SubmitButtonComponent } from './components';
import { PopupService } from './services';

@NgModule({
  declarations: [LevelSelectComponent, SubmitButtonComponent, PopupComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [SubmitButtonComponent, LevelSelectComponent, PopupComponent],
  entryComponents: [PopupComponent],
  providers: [PopupService],
})
export class SharedUiModule {}
