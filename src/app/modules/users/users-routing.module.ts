import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../../../constants/routes.constants';
import { AuthorizationGuard } from '../../core/guards/authorization.guard';
import { UsersListComponent, UserComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: ROUTES.userProfile, pathMatch: 'full' },
  { path: ROUTES.usersList, component: UsersListComponent, canActivate: [AuthorizationGuard] },
  { path: ROUTES.userProfile, component: UserComponent, canActivate: [AuthorizationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
