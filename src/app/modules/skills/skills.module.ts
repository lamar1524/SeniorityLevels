import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@core/material/material.module';
import { SkillsComponent, SkillComponent } from '@modules/skills/components';
import { SkillsRoutingModule } from '@modules/skills/skills-routing.module';

@NgModule({
  declarations: [SkillsComponent, SkillComponent],
  imports: [CommonModule, MaterialModule, SkillsRoutingModule],
})
export class SkillsModule {}
