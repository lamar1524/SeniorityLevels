import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { USERS_FEATURE } from '@constants/users.constants';
import { MaterialModule } from '@core/material';
import { SharedUiModule } from '@modules/reusable';
import { UsersListComponent, UserComponent, UserProfileComponent } from './components';
import { usersReducer, UsersEffects } from './store';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersListComponent, UserComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    SharedUiModule,
    StoreModule.forFeature(USERS_FEATURE, usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
})
export class UsersModule {}
