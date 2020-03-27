import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { MainComponent } from './components';

const routes: Routes = [
  {
    path: ROUTES.dashboard.path,
    component: MainComponent,
    children: [
      {
        path: ROUTES.users.path,
        loadChildren: () => import('@modules/users/users.module').then((mod) => mod.UsersModule),
      },
      {
        path: ROUTES.skills.path,
        loadChildren: () => import('@modules/skills/skills.module').then((mod) => mod.SkillsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
