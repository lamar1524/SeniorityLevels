import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { AuthorizationGuard } from '@core/guards/authorization.guard';
import { TitleResolve } from '@core/resolvers';
import { SkillsComponent, SkillComponent } from '@modules/skills/components';

const routes: Routes = [
  {
    path: ROUTES.home,
    component: SkillsComponent,
    canActivate: [AuthorizationGuard],
    data: {title: 'Choose skill to fill up'}, resolve: [TitleResolve]
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
