import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

const materialModules = [MatInputModule, MatButtonModule, MatFormFieldModule, MatTableModule, MatProgressSpinnerModule];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
