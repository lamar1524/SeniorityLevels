import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { USERS_FEATURE } from '@constants/users.constants';
import { SharedUiModule } from '@modules/reusable';
import { CommentsComponent, UsersListComponent, UserComponent, UserEditFormComponent, UserProfileComponent } from './components';
import { usersReducer, UsersEffects } from './store';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersListComponent, UserComponent, UserProfileComponent, UserEditFormComponent, CommentsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    StoreModule.forFeature(USERS_FEATURE, usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
})
export class UsersModule {}
