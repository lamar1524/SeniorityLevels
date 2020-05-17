import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthorizationGuard } from '@core/guards/authorization.guard';
import { TitleResolve } from '@core/resolvers/title.resolve';
import { CommentsCategoryChooseComponent, UsersListComponent, UserComponent, UserProfileComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: ROUTES.userProfile.path, pathMatch: 'full' },
  {
    path: ROUTES.usersList.path,
    component: UsersListComponent,
    canActivate: [AuthorizationGuard],
    data: { title: ROUTES.usersList.title },
    resolve: [TitleResolve],
  },
  {
    path: ROUTES.userProfile.path,
    component: UserComponent,
    canActivate: [AuthorizationGuard],
    data: { title: ROUTES.userProfile.title },
    resolve: [TitleResolve],
  },
  { path: `${ROUTES.otherUserProfile.path}/:key`, component: UserProfileComponent, canActivate: [AuthorizationGuard] },
  { path: `${ROUTES.comments.path}/:userId/:category`, component: CommentsCategoryChooseComponent, canActivate: [AuthorizationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
