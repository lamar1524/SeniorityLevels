import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { MainComponent } from './components';

const routes: Routes = [
  {
    path: ROUTES.dashboard,
    component: MainComponent,
    children: [
      {
        path: ROUTES.users,
        loadChildren: () => import('@modules/users/users.module').then((mod) => mod.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
