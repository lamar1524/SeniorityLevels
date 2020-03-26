import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { TitleResolve } from '@core/resolvers';
import { LoginComponent, RegisterComponent } from './components';

const routes: Routes = [
  { path: ROUTES.home, component: LoginComponent, data: {title: 'Login'}, resolve: [TitleResolve] },
  { path: ROUTES.register, component: RegisterComponent, data: {title: 'Register'}, resolve: [TitleResolve]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
