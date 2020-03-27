import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { TitleResolve } from '@core/resolvers';
import { LoginComponent, RegisterComponent } from './components';

const routes: Routes = [
  { path: ROUTES.login.path, component: LoginComponent, data: { title: ROUTES.login.path }, resolve: [TitleResolve] },
  { path: ROUTES.register.path, component: RegisterComponent, data: { title: ROUTES.register.title }, resolve: [TitleResolve] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
