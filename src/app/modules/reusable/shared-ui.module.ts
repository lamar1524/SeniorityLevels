import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { REUSABLE_FEATURE } from '@constants/reusable.constants';
import { MaterialModule } from '@core/material';
import { CommentsService } from '@modules/reusable/services/comments.service';
import { ReusableEffects } from '@modules/reusable/store/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommentsComponent, LevelSelectComponent, PopupComponent, SubmitButtonComponent } from './components';
import { DialogComponent, UserBadgeComponent } from './components';
import { SlugTextifyPipe, TextSlugifyPipe } from './pipes';
import { DialogService, PopupService } from './services';
import { reusableReducer } from './store/reducers';

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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(REUSABLE_FEATURE, reusableReducer),
    EffectsModule.forFeature([ReusableEffects]),
  ],
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
  providers: [PopupService, DialogService, CommentsService],
})
export class SharedUiModule {}
