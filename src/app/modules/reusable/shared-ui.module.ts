import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material';
import { LevelSelectComponent, PopupComponent, SubmitButtonComponent } from './components';
import { DialogComponent, UserBadgeComponent } from './components';
import { PopupService } from './services';

@NgModule({
  declarations: [LevelSelectComponent, SubmitButtonComponent, PopupComponent, DialogComponent,  UserBadgeComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [SubmitButtonComponent, LevelSelectComponent, PopupComponent, UserBadgeComponent],
  entryComponents: [PopupComponent],
  providers: [PopupService],
})
export class SharedUiModule {}
