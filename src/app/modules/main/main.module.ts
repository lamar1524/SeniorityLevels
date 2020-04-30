import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { SharedUiModule } from '@modules/reusable';
import { MainComponent, NavigationComponent } from './components';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [NavigationComponent, MainComponent],
  imports: [CommonModule, RouterModule, MainRoutingModule, MatButtonModule, SharedUiModule],
})
export class MainModule {}
