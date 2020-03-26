import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material';
import { AuthenticationService, LoginComponent, RegisterComponent } from '@modules/authentication';
import { SharedUiModule } from '@modules/reusable';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthenticationRoutingModule, SharedUiModule, MaterialModule, ReactiveFormsModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
