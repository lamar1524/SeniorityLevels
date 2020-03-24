import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@core/material/material.module';
import { SharedUiModule } from '@modules/reusable/shared-ui.module';
import { UsersListComponent, UserComponent, UserProfileComponent } from './components';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersListComponent, UserComponent, UserProfileComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, SharedUiModule],
})
export class UsersModule {}
