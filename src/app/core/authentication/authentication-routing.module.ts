import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@constants/routes.constants';
import { LoginComponent, RegisterComponent } from './components';

const routes: Routes = [
  { path: ROUTES.home, component: LoginComponent },
  { path: ROUTES.register, component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
