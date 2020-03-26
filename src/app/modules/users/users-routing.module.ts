import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthorizationGuard } from '@core/guards/authorization.guard';
import { TitleResolve } from '@core/resolvers/title.resolve';
import { UsersListComponent, UserComponent, UserProfileComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: ROUTES.userProfile, pathMatch: 'full' },
  {
    path: ROUTES.usersList,
    component: UsersListComponent,
    canActivate: [AuthorizationGuard],
    data: { title: 'Users list' },
    resolve: [TitleResolve],
  },
  {
    path: ROUTES.userProfile,
    component: UserComponent,
    canActivate: [AuthorizationGuard],
    data: { title: 'Your profile' },
    resolve: [TitleResolve],
  },
  { path: `${ROUTES.otherUserProfile}/:key`, component: UserProfileComponent, canActivate: [AuthorizationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
