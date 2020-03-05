import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/core/material/material.module';
import { UsersListComponent } from './components';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersListComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule],
})
export class UsersModule {}
