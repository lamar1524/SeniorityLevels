import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from '@shared/navigation/navigation.component';
import { MainComponent } from './components/main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [NavigationComponent, MainComponent],
  imports: [CommonModule, RouterModule, MainRoutingModule],
})
export class MainModule {}
