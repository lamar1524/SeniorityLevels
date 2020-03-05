import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../constants/routes.constants';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/authentication/authentication.module').then((mod) => mod.AuthenticationModule),
  },
  {
    path: ROUTES.users,
    loadChildren: () => import('./modules/users/users.module').then((mod) => mod.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
