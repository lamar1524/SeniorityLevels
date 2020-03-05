import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from '../../core/guards/authorization.guard';
import { UsersListComponent, UserComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'list', component: UsersListComponent, canActivate: [AuthorizationGuard] },
  { path: 'profile', component: UserComponent, canActivate: [AuthorizationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
