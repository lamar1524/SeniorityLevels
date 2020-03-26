import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';

const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
