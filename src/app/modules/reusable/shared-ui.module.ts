import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material';
import { LevelSelectComponent, PopupComponent, PopupService, SubmitButtonComponent } from '@modules/reusable';

@NgModule({
  declarations: [LevelSelectComponent, SubmitButtonComponent, PopupComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [SubmitButtonComponent, LevelSelectComponent, PopupComponent],
  entryComponents: [PopupComponent],
  providers: [PopupService],
})
export class SharedUiModule {}
