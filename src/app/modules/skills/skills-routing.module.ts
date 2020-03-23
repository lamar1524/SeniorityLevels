import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthorizationGuard } from '@core/guards/authorization.guard';
import { SkillsComponent, SkillComponent } from '@modules/skills/components';

const routes: Routes = [
  {
    path: ROUTES.home,
    component: SkillsComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: `${ROUTES.skill}/:category`,
    component: SkillComponent,
    canActivate: [AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsRoutingModule {}
