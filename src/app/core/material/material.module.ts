import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatTableModule,
} from '@angular/material';

const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
