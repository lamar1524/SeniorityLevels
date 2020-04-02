import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AUTHENTICATION_FEATURE } from '@constants/authentication.constants';
import { MaterialModule } from '@core/material';
import { SharedUiModule } from '@modules/reusable';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent, RegisterComponent } from './components';
import { AuthenticationService } from './services';
import { AuthenticationEffects } from './store/effects';
import { authReducer } from './store/reducers';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedUiModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(AUTHENTICATION_FEATURE, authReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
