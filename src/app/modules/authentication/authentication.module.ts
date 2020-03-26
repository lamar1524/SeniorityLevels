import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material';
import { SharedUiModule } from '@modules/reusable';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent, RegisterComponent } from './components';
import { AuthenticationService } from './services';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthenticationRoutingModule, SharedUiModule, MaterialModule, ReactiveFormsModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
