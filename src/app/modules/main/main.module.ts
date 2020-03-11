import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './components';
import { MainComponent } from './components';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [NavigationComponent, MainComponent],
  imports: [CommonModule, RouterModule, MainRoutingModule],
})
export class MainModule {}
