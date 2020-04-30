import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material';
import { SlugTextifyPipe, TextSlugifyPipe } from '@modules/reusable/pipes';
import { CommentsComponent, LevelSelectComponent, PopupComponent, SubmitButtonComponent } from './components';
import { DialogComponent, UserBadgeComponent } from './components';
import { DialogService, PopupService } from './services';

@NgModule({
  declarations: [
    LevelSelectComponent,
    SubmitButtonComponent,
    PopupComponent,
    DialogComponent,
    UserBadgeComponent,
    TextSlugifyPipe,
    SlugTextifyPipe,
    CommentsComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    SubmitButtonComponent,
    LevelSelectComponent,
    PopupComponent,
    UserBadgeComponent,
    MaterialModule,
    TextSlugifyPipe,
    SlugTextifyPipe,
    CommentsComponent,
  ],
  entryComponents: [PopupComponent],
  providers: [PopupService, DialogService],
})
export class SharedUiModule {}
