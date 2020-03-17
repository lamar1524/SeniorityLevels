import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
} from '@angular/material';

const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
