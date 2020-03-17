import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@core/material/material.module';
import { SkillsComponent, SkillComponent, UsersListComponent, UserComponent, UserProfileComponent } from './components';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersListComponent, UserComponent, UserProfileComponent, SkillsComponent, SkillComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule],
})
export class UsersModule {}
