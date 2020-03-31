import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '@core/material';
import { AuthenticationEffects } from '@modules/authentication/store/effects/authentication.effects';
import { authReducer } from '@modules/authentication/store/reducers/authentication.reducers';
import { SharedUiModule } from '@modules/reusable';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent, RegisterComponent } from './components';
import { AuthenticationService } from './services';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedUiModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
