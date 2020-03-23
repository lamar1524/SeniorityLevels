import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material/material.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent, RegisterComponent } from './components';
import { SubmitButtonComponent } from './components';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SubmitButtonComponent],
  imports: [CommonModule, AuthenticationRoutingModule, MaterialModule, ReactiveFormsModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
