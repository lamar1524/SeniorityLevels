import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material/material.module';
import { LevelSelectComponent, SubmitButtonComponent } from '@modules/reusable/components';

@NgModule({
  declarations: [LevelSelectComponent, SubmitButtonComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [
    SubmitButtonComponent,
    LevelSelectComponent
  ],
})
export class SharedUiModule {}
