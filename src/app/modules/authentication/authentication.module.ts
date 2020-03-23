import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@core/material/material.module';
import { ReusableModule } from '@modules/reusable/reusable.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent, RegisterComponent } from './components';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthenticationRoutingModule, ReusableModule, MaterialModule, ReactiveFormsModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
