import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SkillsComponent, SkillComponent } from '@modules/skills/components';
import { SkillsRoutingModule } from '@modules/skills/skills-routing.module';




@NgModule({
  declarations: [SkillsComponent, SkillComponent],
  imports: [
    CommonModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
