import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material/material.module';
import { LevelSelectComponent, PopupComponent, SubmitButtonComponent } from '@modules/reusable/components';
import { PopupService } from '@modules/reusable/services/popup.service';

@NgModule({
  declarations: [LevelSelectComponent, SubmitButtonComponent, PopupComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [SubmitButtonComponent, LevelSelectComponent, PopupComponent],
  entryComponents: [PopupComponent],
  providers: [PopupService]
})
export class SharedUiModule {}
